import Head from "next/head"
import { Table, Tabs } from "antd"
import { GetStaticProps } from "next"
import { NormalFreqDistData } from "@/components/freq-dist-tables/Normal"
import { CumulativeFreqDistData } from "@/components/freq-dist-tables/Cumulative"
import { FC as FunctionalComponent } from "react"
import { CumulativeTable, BasicTable } from "@/components/freq-dist-tables"
import { LineChart, BarChart, PieChart } from "@/components/charts"
import {
  getMean,
  getMode,
  getData,
  getMedian,
  getQuartiles,
  getVariants,
  getStdDeviation,
  extractValuesFromRecords,
} from "@/utils"

const { TabPane } = Tabs

interface FilteredRecord {
  id: number
  key: number
  name: string
  kota: string
  data: number
}

interface HomeProps {
  records: FilteredRecord[]
  recordValues: number[]
}

const columns = [
  { key: "key", dataIndex: "key", title: "No." },
  { key: "data", dataIndex: "data", title: "Nilai Data" },
]

const Home: FunctionalComponent<HomeProps> = ({ records, recordValues }) => {
  const data = records
  const mean = getMean(recordValues)
  const modus = getMode(recordValues)
  const median = getMedian(recordValues)
  const variants = getVariants(recordValues)
  const stdDeviation = getStdDeviation(variants)
  const { quartile1, quartile2, quartile3 } = getQuartiles(recordValues)

  return (
    <div>
      <Head>
        <title>Visualisasi Data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-table__container">
        <Table
          dataSource={data}
          columns={columns}
          size="small"
          title={() => <h2 style={{ fontSize: "2em" }}>Data Survey</h2>}
        />

        <div className="main-table__processed-data-container">
          <ul>
            <li className="main-table__processed-data">Mean: {mean}</li>
            <li className="main-table__processed-data">Modus: {modus}</li>
            <li className="main-table__processed-data">Median: {median}</li>
            <li className="main-table__processed-data">
              Kuartil 1: {quartile1}
            </li>
            <li className="main-table__processed-data">
              Kuartil 2: {quartile2}
            </li>
            <li className="main-table__processed-data">
              Kuartil 3: {quartile3}
            </li>
            <li className="main-table__processed-data">Varian: {variants}</li>
            <li className="main-table__processed-data">
              Standard Deviasi: {stdDeviation}
            </li>
          </ul>
        </div>
      </div>

      <div className="visualization__container">
        <h2 style={{ textAlign: "center", fontSize: "2.5em" }}>
          Tabel Distribusi Frekuensi & Visualisasi
        </h2>
        <Tabs
          defaultActiveKey="1"
          style={{ width: "85%" }}
          size="large"
          centered
        >
          <TabPane tab="Normal & Relatif" key="1" style={{ width: "100%" }}>
            <div style={{ margin: "20px 0" }}>
              <BasicTable />
            </div>
            <hr style={{ margin: "15px 0" }} />
            <div>
              <h3 style={{ textAlign: "center", fontSize: "2.2em" }}>
                Visualisasi Distribusi Frekuensi
              </h3>
              <Tabs defaultActiveKey="1" centered size="small">
                <TabPane tab="Diagram Balok" key="1">
                  <BarChart
                    data={NormalFreqDistData}
                    xAxisKeyName="interval"
                    barDataKeys={["frekuensi", "persentase"]}
                    labels={["Frekuensi", "Persentase"]}
                  />
                </TabPane>
                <TabPane tab="Diagram Lingkaran" key="2">
                  <PieChart
                    data={NormalFreqDistData}
                    nameKey="interval"
                    dataKeys={["frekuensi", "persentase"]}
                    legendLabels={["Frekuensi", "Persentase"]}
                  />
                </TabPane>
                <TabPane tab="Diagram Ogive" key="3">
                  <LineChart
                    data={NormalFreqDistData}
                    xAxisKeyName="interval"
                    lineDataKeys={["frekuensi", "persentase"]}
                    labels={["Frekuensi", "Persentase"]}
                  />
                </TabPane>
              </Tabs>
            </div>
          </TabPane>
          <TabPane tab="Kumulatif & Relatif-Kumulatif" key="2">
            <CumulativeTable />
            <hr style={{ margin: "15px 0" }} />
            <div>
              <h3 style={{ textAlign: "center", fontSize: "2.2em" }}>
                Visualisasi Distribusi Frekuensi Kumulatif
              </h3>
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Kurang dari" key="1">
                  <Tabs defaultActiveKey="1" tabPosition="left">
                    <TabPane tab="Diagram Balok" key="1">
                      <BarChart
                        data={CumulativeFreqDistData}
                        xAxisKeyName="kelasKurangDari"
                        barDataKeys={[
                          "frekuensiKurangDari",
                          "persentasiFrekKurangDari",
                        ]}
                        labels={["Frekuensi", "Persentase"]}
                      />
                    </TabPane>
                    <TabPane tab="Diagram Lingkaran" key="2">
                      <PieChart
                        data={CumulativeFreqDistData}
                        nameKey="kelasKurangDari"
                        dataKeys={[
                          "frekuensiKurangDari",
                          "persentasiFrekKurangDari",
                        ]}
                        legendLabels={["Frekuensi", "Persentase"]}
                      />
                    </TabPane>
                    <TabPane tab="Diagram Ogive" key="3">
                      <LineChart
                        data={CumulativeFreqDistData}
                        xAxisKeyName="kelasKurangDari"
                        lineDataKeys={[
                          "frekuensiKurangDari",
                          "persentasiFrekKurangDari",
                        ]}
                        labels={["Frekuensi", "Persentase"]}
                      />
                    </TabPane>
                  </Tabs>
                </TabPane>
                <TabPane tab="Lebih dari" key="2">
                  <Tabs defaultActiveKey="1" tabPosition="left">
                    <TabPane tab="Diagram Balok" key="1">
                      <BarChart
                        data={CumulativeFreqDistData}
                        xAxisKeyName="kelasLebihDari"
                        barDataKeys={[
                          "frekuensiLebihDari",
                          "persentasiFrekLebihDari",
                        ]}
                        labels={["Frekuensi", "Persentase"]}
                      />
                    </TabPane>
                    <TabPane tab="Diagram Lingkaran" key="2">
                      <PieChart
                        data={CumulativeFreqDistData}
                        nameKey="kelasLebihDari"
                        dataKeys={[
                          "frekuensiLebihDari",
                          "persentasiFrekLebihDari",
                        ]}
                        legendLabels={["Frekuensi", "Persentase"]}
                      />
                    </TabPane>
                    <TabPane tab="Diagram Ogive" key="3">
                      <LineChart
                        data={CumulativeFreqDistData}
                        xAxisKeyName="kelasLebihDari"
                        lineDataKeys={[
                          "frekuensiLebihDari",
                          "persentasiFrekLebihDari",
                        ]}
                        labels={["Frekuensi", "Persentase"]}
                      />
                    </TabPane>
                  </Tabs>
                </TabPane>
              </Tabs>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const getStaticProps: GetStaticProps = async () => {
  const records = await getData()
  const recordValues = extractValuesFromRecords(records)

  return {
    props: {
      records: records,
      recordValues: recordValues,
    },
  }
}

export default Home
export { getStaticProps }
