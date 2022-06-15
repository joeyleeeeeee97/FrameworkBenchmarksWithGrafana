const workloads = ["fortune", "plaintext", "db", "update", "json", "query", "cached-query"]
const workloadMap = {
    "query": "queryIntervals", "plaintext": "pipelineConcurrencyLevels", "db": "concurrencyLevels",
    "update": "concurrencyLevels", "fortune": "concurrencyLevels", "json": "concurrencyLevels"
}

class FrameworkBenchmarksParser {
    async parse(data) {
        let results = []
        for (let workload of workloads) {
            let stressLevels = data[workloadMap[workload]]
            for (const [testName, runs] of Object.entries(data.rawData[workload])) {
                for (let i = 0; i < runs.length; i++) {
                    let run = runs[i]
                    run.test = testName
                    run.workload = workload
                    run.env = data.environmentDescription
                    run.uuid = data.uuid
                    run.stress = stressLevels[i]
                    results.push(run)
                }
            }
        }
        return results
    }
}

module.exports = FrameworkBenchmarksParser