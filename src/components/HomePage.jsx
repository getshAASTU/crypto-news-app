import React from "react";
import millify from "millify";
import { Row, Typography, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";
import Loader from "./Loader";
const { Title } = Typography;

const HomePage = () => {
  const {data, isFetching} = useGetCryptosQuery(10)
  if(isFetching){
    return <Loader/>
  }
  const globalStats = data?.data?.stats;
  return (
    <div className="homePage">
      <Title level={2} className="headings">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total CryptoCurrencies" value={millify(globalStats.total)}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="Total Market cap" value={millify(globalStats.totalMarketCap)}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}></Statistic>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title className="home-title" level={2}>Top CryptoCurrencies</Title>
        <Title className="show-more" level={3}><Link to='/cryptocurrencies'>Show More</Link></Title>
      </div>
      <CryptoCurrencies simplified/>
      <div className="home-heading-container"> 
        <Title className="home-title" level={2}>Latest Crypto News</Title>
        <Title className="show-more" level={3}><Link to='/news'>Show More</Link></Title>
      </div>
      <News simplified/>
    </div>
  );
};

export default HomePage;
