const FrameworkBenchmarksParser = require("../parsers/FrameworkBenchmarksParser");
const influx = require("../db/influx");

module.exports = async (req, res) => {
    try {
        await FrameworkBenchmarkHandle(req, res);
    } catch (err) {
        console.log(err)
    }
}

async function FrameworkBenchmarkHandle(req, res) {
    let tfbParser = new FrameworkBenchmarksParser()
    let results = await tfbParser.parse(req.body)
    let influxdb = new influx()
    influxdb.write(results)
    res.send({results})
}