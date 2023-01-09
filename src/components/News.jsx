import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const { Title, Text } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const {data} = useGetCryptosQuery(100)
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) {
    return <Loader/>
  }
  return (
    <>
      <Row gutter={[24, 24]} className='news-gutter'>
        {!simplified && (
          <Col span={24}>
            <Select
            // mode="multiple"
            // defaultValue={}
            showSearch
            className="select-news"
            onChange={(value)=>setNewsCategory(value)}
            placeholder='select a crypto'
            optionFilterProp="children"
            filterOption = {(option,input)=> option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
            >
            <Option value='Cryprocurrency'>Cryptocurrency</Option>
            {
              data?.data?.coins.map((coin)=> <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>)
            }
            </Select>
          </Col>

        )}
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    className="demoImage"
                    style={{ width: "80px", height: "80px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
