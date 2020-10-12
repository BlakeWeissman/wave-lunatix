import React, {Component, CSSProperties} from "react";
import './Sports.scss';
import {Hero} from "../Hero/Hero";
import Slider from "react-rangeslider";
import Axios from "axios";

export class Sports extends Component<{}, {
  adStyle: CSSProperties,
  teamData: {
    meta: {
      currentPage: number,
      next_page: any,
      per_page: number,
      total_count: number,
      total_pages: number,
    },
    data: {
      abbreviation: string,
      city: string,
      conference: string,
      division: string,
      full_name: string,
      id: number,
      name: string
    }[]
  }
}> {

  private teamPrices = [99, 120, 92, 115, 134, 101, 123, 92, 89, 105, 112, 113, 121, 130, 110, 120, 108, 109, 107, 98, 85, 135, 143, 111, 118, 103, 134, 125, 104, 108];
  private toolbar: React.RefObject<HTMLDivElement>;
  private bottomContentTopMargin = 50;

  constructor(props: {}) {
    super(props);
    this.toolbar = React.createRef();
  }

  componentDidMount() {
    if (!this.state?.teamData) {
      Axios.get("https://free-nba.p.rapidapi.com/teams?page=0", {
        headers: {
          "x-rapidapi-host": "free-nba.p.rapidapi.com", 
          "x-rapidapi-key": "e5d8563997mshcfb030c802400d3p1ec262jsn6864acf2d34a" 
        }
      }).then((response: any) => {
        this.setState({
          teamData: response.data
        });
      }).catch(error => {
        console.error(error);
      });
    }
    if (this.toolbar.current) {
      this.setState({
        adStyle: {
          marginTop: this.toolbar.current.clientHeight + this.bottomContentTopMargin
        }
      });
    }
  }

  render() {
    return (
      <div id="sports">
        <Hero 
          title="Sports" 
          imgFilename="sports.jpg" 
        />
        <div>
          <div>
            <div ref={this.toolbar}>
              <div>
                <a>
                  By Team
                </a>
                <a>
                  By Price
                </a>
              </div>
              <div>
                <label>
                  <span>
                    Distance
                  </span>
                  <span>
                    10 mi
                  </span>
                </label>
                <div>
                  <span>
                    0
                  </span>
                    <Slider value={20} />
                  <span>
                    30
                  </span>
                </div>
              </div>
            </div>
            <div style={{marginTop: this.bottomContentTopMargin}}>
              {
                (
                  () => {
                    const teams = this.state?.teamData?.data
                    if (teams) {
                      const columns = [];
                      for (let i = 0; i < 2; i++) {
                        columns.push(
                          <div key={i}>
                            {
                              (
                                () => {
                                  const teamDivs = [];
                                  const start = (teams.length * i) * 0.5;
                                  const end = (teams.length * (i + 1)) * 0.5;
                                  for (let k = start; k < end; k++) {
                                    teamDivs.push(
                                      <div key={k}>
                                        <span>
                                          {teams[k].full_name}
                                        </span>
                                        <span>
                                          from <span>&#36;{this.teamPrices[k]}</span>
                                        </span>
                                      </div>
                                    );
                                  }
                                  return teamDivs;
                                }
                              )() 
                            }
                          </div>
                        );
                      }
                      return columns;
                    } else {
                      return <h1>Loading</h1>;
                    }
                  }
                )()
              }
            </div>
          </div>
          <div style={this.state?.adStyle}>
            Placeholder for promotional messaging
          </div>
        </div>
      </div>
    );
  }
}
