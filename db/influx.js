const { InfluxDB, Point, HttpError } = require('@influxdata/influxdb-client')
const { url, token, org, bucket } = require('../env')

class influx {
    async write(results, test) {
        let writeApi = new InfluxDB({ url, token }).getWriteApi(org, bucket, 'ns')
        writeApi.useDefaultTags({ location: hostname() })

        for (let result of results) {
            let point = new Point(test)
                .tag(result.test, result.workload, result.uuid, result.env)
                .floatField('latencyAvg', this.convertToMs(result.latencyAvg))
                .floatField('latencyMax', this.convertToMs(result.latencyMax))
                .floatField('latencyStdev', this.convertToMs(result.latencyStdev))
                .integerField('totalRequests', result.totalRequests)
                .integerField('startTime', result.startTime)
                .integerField('endTime', result.endTime)
                .integerField('stress', result.stress)
                .timestamp(new Date())
            writeApi.writePoint(point)
        }
        writeApi.close()
    }

    convertToMs(timeStr) {
        if (timeStr.endsWith("ms")) {
            return parseFloat(timeStr.split("ms")[0])
        } else if (timeStr.endsWith("us")) {
            return parseFloat(timeStr.split("us")[0]) / 1000
        } else if (timeStr.endsWith("s")) {
            return parseFloat(timeStr.split("s")[0]) * 1000
        }

    }
}


module.exports = influx