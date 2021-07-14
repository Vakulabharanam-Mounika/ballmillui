import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import XYAxis from './components/axis/xy-axis';
import Line from './components/line/line';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';

class App extends Component {
    constructor() {
        super();
        this.state = {
            millData: [],
            ballmillData: [],
            val : [],
            data : [],
        }

    }
    //var date_out = format.parse(created_on);


    formatData(millData,key,key1) {
        const temp=[];

        console.log("n",millData[0])
        //key1 = d3.time.format("%H:%M:%S").parse
        console.log("y",typeof (millData[2][key1]));
        for(let i = 0; i <millData.length; i++)
        {

            temp[i] = {"name":millData[i][key1].slice(17,25),"value":millData[i][key]};

        }

        return temp;

    }
    componentWillMount() {
        axios.get(`http://192.168.0.103:5000/api/ballmill`)
            .then(res => {
                const millData = res.data;
                this.setState({millData});
                this.state.val=this.formatData(millData["ballmill"],"seperator_power","created_on");
                console.log("s",this.state.val);


            })

    }

    componentDidMount() {

        axios.get(`http://192.168.0.103:5000/api/ballmill`)
            .then(res => {
                const millData = res.data;
                this.setState({millData});

                this.state.val=this.formatData(millData["ballmill"],"seperator_power","created_on");
                console.log("hello",this.state.val);

            })




    }
    render() {
        const data = this.state.val;
        console.log("m",this.state.val)
        //const data = [{"name":1,"value":30.222},{"name":2,"value":40.333},{"name":3,"value":50.24},{"name":4,"value":90.99},{"name":5,"value":20.56}]
        const parentWidth = 500;
        const margins = {
            top: 20,
            right: 20,
            bottom: 90,
            left: 50,
        };
        const width = parentWidth - margins.left - margins.right;
        const height = 200 - margins.top - margins.bottom;
        const ticks = 5;
        const t = transition().duration(10);
        //const xScale = scaleBand()
           // .domain(data.map(d => d.name))
            //.rangeRound([0, width]).padding(0.1);
        const xScale = scaleBand()
            .domain(data.map(d => d.name))
            .range([0, width+this.state.val.length]).padding(0.5);




            //Appending x-axis;
        // eslint-disable-next-line no-undef
            //svg.append("g") .attr("transform", "translate(0, 300)") .call(d3.axisBottom(x)); svg.append("text") .attr("transform", "translate(100, 340)") .text("Year");
        const yScale = scaleLinear()
            .domain(extent(data, d => d.value))
            .range([height, 0])
            .nice();
        const lineGenerator = line()
            .x(d => xScale(d.name))
            .y(d => yScale(d.value))
            .curve(curveMonotoneX);
        return (
            <div>
                <h1>
                    &emsp; &emsp;&emsp; Data Visualization
                </h1>
                <svg

                    className="lineChartSvg"
                    width={width + margins.left + margins.right}
                    height={height + margins.top + margins.bottom}
                >
                    <g transform={`translate(${margins.left}, ${margins.top})`}>
                        <XYAxis {...{ xScale, yScale, height, ticks, t }} />
                        <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
                    </g>
                </svg>

                <h4>

                      &emsp; &emsp;&emsp;&emsp;&emsp; Seperator power vs time
                   </h4>
            </div>
        );
    }
}
render(<App />, document.getElementById('root'));
/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();