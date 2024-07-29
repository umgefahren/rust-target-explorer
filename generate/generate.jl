import Pkg; Pkg.add("JSON")
import JSON

function get_target_list()
    cmd = `rustc --print target-list`
    return filter((x) -> x != "" && !startswith(x, "xtensa-esp32"),  split(read(cmd, String), '\n'))
end

function get_cpus(target)::Vector{String}
    cmd = `rustc --print target-cpus --target $target`
    re = r"([^ ]+)"
    lines = map((x) -> match(re, x)[1], filter((x) -> x != "Available CPUs for this target:", map((x) -> strip(x), filter((x) -> x != "", split(read(cmd, String), '\n')))))
    return lines
end

function get_cfgs(target)::Vector{String}
    cmd = `rustc --print cfg --target $target`
    lines = map((x) -> strip(x), filter((x) -> x != "", split(read(cmd, String), '\n')))
    return lines
end

struct Feature
    name::String
    explanation::String
    llvm::Bool
end

function get_features(target)::Vector{Feature}
    cmd = `rustc --print target-features --target $target`
    ret = []
    passed_llvm = false
    lines = map((x) -> strip(x), filter((x) -> x != "", split(read(cmd, String), '\n')))
    for line in lines
        if line == "Features supported by rustc for this target:"
            continue
        elseif line == "Code-generation features supported by LLVM for this target:"
            passed_llvm = true
            continue
        elseif line == "Use +feature to enable a feature, or -feature to disable it."
            break
        end
        sides = split(line, " - ")
        feature_name = strip(sides[1])
        feature_explanation = ""
        feature_explanation = strip(sides[2])
        feature = Feature(feature_name, feature_explanation, passed_llvm)
        push!(ret, feature)
    end
    return ret
end

function extract_arch(cfgs::Vector{String})::String
    arch = ""
    re = r"target_arch=\"(.+)\""
    for cfg in cfgs
        if occursin(re, cfg)
            arch = match(re, cfg)[1]
            break
        end
    end
    if arch == ""
        error("no arch")
    end
    return arch
end

function extract_features(cfgs)::Vector{String}
    features = []
    re = r"target_feature=\"(.+)\""
    for cfg in cfgs
        if occursin(re, cfg)
            push!(features, match(re, cfg)[1])
        end
    end
    return features
end

function extract_os(cfgs::Vector{String})::String
    re = r"target_os=\"(.+)\""
    for cfg in cfgs
        if occursin(re, cfg)
            return match(re, cfg)[1]
        end
    end
    error("Fuck")
end

function extract_family(cfgs::Vector{String})::String
    re = r"target_family=\"(.+)\""
    for cfg in cfgs
        if occursin(re, cfg)
            return match(re, cfg)[1]
        end
    end
    error("Fuck")
end

struct Target
    name::String
    cfgs::Vector{String}
    cpus::Vector{String}
    features::Vector{Feature}
    arch::String
    os::String
    family::String
end

arches::Set{String} = Set()
cpus_coll = Set()
cpus_on_target::Dict{Tuple{String, String}, Vector{Target}} = Dict()

function getTarget(name)::Target
    cfgs = get_cfgs(name)
    features = get_features(name)
    arch = extract_arch(cfgs)
    push!(arches, arch)
    os = extract_os(cfgs)
    family = extract_os(cfgs)
    cpus = get_cpus(name)
    target = Target(name, cfgs, cpus, features, arch, os, family) 
    for cpu in cpus
	if startswith(cpu, "esp32") then
		continue
	end
        push!(cpus_coll, (arch, cpu))
        if haskey(cpus_on_target, (arch, cpu))
            current = cpus_on_target[(arch, cpu)]
            push!(current, target)
            cpus_on_target[(arch, cpu)] = current
        else
            cpus_on_target[(arch, cpu)] = [target]
        end
    end
    return target
end

@enum Endian little big

function extract_endian(cfgs)::Endian
    for cfg in cfgs
        if cfg == "target_endian=\"little\""
            return little
        elseif cfg == "target_endian=\"big\"" 
            return big
        end
    end
    error("Fuck this is interesting")
end

struct Cpu
    name::String
    arch::String
    targets::Vector{String}
    endianess::Endian
    features::Vector{String}
end

function getCpu(name::String, arch::String, targets::Vector{Target})::Cpu
    target = targets[1].name
    cmd = `rustc --print cfg --target $target -C target-cpu=$name`
    cfgs = map((x) -> strip(x), filter((x) -> x != "", split(read(cmd, String), '\n')))
    endianess = extract_endian(cfgs)
    features = extract_features(cfgs)
    Cpu(name, arch, map((x) -> x.name, targets), endianess, features)
end

target_list = get_target_list()

println(target_list)

targets::Vector{Target} = map((target) -> getTarget(target), target_list)


println(arches)

cpus::Vector{Cpu} = []

for key in keys(cpus_on_target)
    ts = cpus_on_target[key]
    arch = key[1]
    cpu = key[2]
    try
        push!(cpus, getCpu(cpu, arch, ts))
    catch e
        println("Error: $e")
    end
end

arch_features::Dict{String, Vector{Feature}} = Dict()

for t in targets
    arch_features[t.arch] = t.features
end

io = open("data.json", "w")
write(io, JSON.json(targets))

io = open("cpus.json", "w")
write(io, JSON.json(cpus))

io = open("features.json", "w")
write(io, JSON.json(arch_features))
