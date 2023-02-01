import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import RankItem from "./Chart/RankItem";
import _  from 'lodash'
import RankItemChart from "./Chart/RankItemChart";
import { useNavigate } from "react-router-dom";
const ChartContainer = styled.div.attrs(() => ({
  className:'container'
}))`
  display: flex;
  z-index: 90;
  margin-top: 10px;
  position: relative;
  align-items: center;
  gap: 10px;
  &.dblock{
    display: block;
  }
  @media screen and (max-width: 964px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    .charts {
      width: 100% !important;
    }
  }
  .ranking {
    width: 40%;
    @media screen and (max-width: 964px) {
      width: 100%;
    }
    
    .rank-list {
      display: flex;
      flex-direction: column;
      button {
        text-align: "center";
        width: 100px;
        align-self: center;
        padding: 8px;
        border: 0.5px solid white;
        background: transparent;
        margin-top: 10px;
        color: white;
        border-radius: 999px;
        outline: none;
        cursor: pointer;

        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
  .rank-list.disable{
    display: none;
  }
  .charts {
    width: 60%;
    height: 40vh;
    position: relative;
  }
  .charts.fullw{
    width: 100%;
  }
`;
const Container = styled.div`
  padding: 20px;
  position: relative;
  /* min-height: 500px; */
  .alpha {
    border-radius: 20px;
    z-index: 1;
    overflow: hidden;
    background-image: linear-gradient(180deg, #740091, #2d1a4c);
    opacity: 0.95;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .alpha.yellow{
    background-image: linear-gradient(180deg, #e5e3df, #e5e3df);
    opacity: 0.6;
    border-radius: 0px;
  }
  .alpha-1{
    

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 ;
    z-index: 0;
    background-image: linear-gradient(180deg,hsla(0,0%,100%,0) 37%,#d99e28);
  }
  .bg-blur {
    background: url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.8.24/static/media/bg-chart.fd766403.jpg)
      top/cover no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;

    left: 0;
  }
  .bg-blur.yellow{
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
    border-radius:0px;

  }
`;
const SectionChart = styled.div`
  position: relative;
  z-index: 90;
  color: white;
`;
const ChartHome = ({disableItem,isLoading}) => {
  const navigate=useNavigate()
  // console.log(disableItem)
  const dataChart = useSelector((state) => state.homeData.chart);
  const chart = dataChart?.chart;
  const rank = dataChart?.items;
  let dataCut = rank?.slice(0, 3);

  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null)
  const [tooltipState, setTooltipState] = useState({
    top: 0,
    left: 0,
    opacity: 0,
    display:'none'
  });
  // console.log(data)
  // console.log(chart.chart.items)
  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 !== 0)
      .map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 !== 0)
            .map((item) => item.counter),
          borderWidth: 1.5,
          pointHoverBorderWidth: 2,
          tension: 0.4,
          hoverBorderWidth: 3,
          pointHoverRadius: 5,
          pointRadius: 0,
          pointHoverBackgroundColor: "#fff",
          borderColor:i === 0 && '#4A90E2' || i === 1 && '#27BD9C' || i === 2 && '#E35050'
        });
      }
      setData({ labels, datasets });
    }
  }, [chart]);
//   console.log(rank)
  return (
  isLoading ? <span style={{fontWeight:'bold'}}>Đang tải Bảng Xếp Hạng...</span> :  <Container>
      <div className={disableItem ? "alpha yellow" : "alpha"}></div>
      <div className={disableItem ? "bg-blur yellow" : "bg-blur"}></div>
      <div className={disableItem && "alpha-1"}></div>
     <SectionChart>
        <div style={{ fontWeight: 700, fontSize: "1.4rem" }}>#zingchart</div>
        <ChartContainer className={disableItem ? "container dblock"  : "container"}>
          <div className="ranking">
            <div className={disableItem ? "rank-list disable" : "rank-list"}>
              <div>
                {dataCut?.map((item, i) => {
                  return (
                    <RankItem
                      key={i}
                      data={item}
                      rank={i}
                      percent={Math.round(
                        (+item.score * 100) / +chart?.totalScore
                      )}
                    />
                  );
                })}
              </div>
              <button onClick={() => navigate('zing-chart')}>Xem thêm</button>
            </div>
          </div>
          <div className={disableItem ? "charts fullw" : "charts"}>
            {data && (
              <Line
                ref={chartRef}
                data={data}
                // redraw={true}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      ticks: { display: false },
                      grid: {
                        drawTicks: false,
                        color: "rgba(255,255,255,0.2)",
                      },
                      min: chart?.minScore,
                      max: chart?.maxScore,

                      border: { dash: [2, 4] },
                    },
                    x: {
                      ticks: { color: "white" },
                      grid: { color: "transparent" },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false,
                      external: (context) => {
                        const tooltipModel = context.tooltip; //lay tooltip tu context
                       
                        if (!chartRef || !chartRef.current) return
                        if (tooltipModel.opacity === 0) {
                          if (tooltipState.opacity !== 0)
                            setTooltipState((prev) => ({ ...prev, opacity: 0 ,display:'none'}));
                          return;
                        }
                        //push array counter và id để so sánh giá trị trong tooltip
                        const counters =[]
                        for(let i = 0 ; i < 3;i++){
                            counters.push({
                                data:chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 !== 0)
                                .map((item) => item.counter),
                                encodeId:Object.keys(chart?.items)[i]
                            })
                        }
                        //so sánh counters và data thằng tooltip để tìm ra data tương ứng

                        const result = counters.find(item => item.data.some(item => item === +tooltipModel.body[0].lines[0].replace(',','')))

                        //set selected
                        setSelected(result.encodeId)
                    
                    
                        
                        const newTooltipData = {
                            top: tooltipModel.caretY,
                            left:tooltipModel.caretX,
                            opacity: 1,
                            display:'block'
                        }
                        if (!_.isEqual(tooltipState, newTooltipData)){
                            setTooltipState(newTooltipData);
                        }
                          
                      },
                    },
                  },
                  hover: {
                    mode: "dataset",
                    intersect: false,
                  },
                  animation:'ease'
                }}
                // updateMode="resize"
              />
            )}
            <div className='tooltip'  
            style={{ 
                top:tooltipState.top, 
                left: tooltipState.left, 
                opacity: tooltipState.opacity,
                display:tooltipState.display,
                position:'absolute' }}>
                    <RankItemChart
                     
                      data={rank?.find(item => item?.encodeId === selected)}
                      percent={selected && Math.round(
                        (rank?.find(item => item.encodeId === selected).score * 100) / +chart?.totalScore
                      )}
                    />

            </div>
          </div>
        </ChartContainer>
      </SectionChart>
    </Container>
  );
};

export default memo(ChartHome);
