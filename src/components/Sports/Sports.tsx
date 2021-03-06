import React, {Component, CSSProperties} from "react";
import './Sports.scss';
import {Hero} from "../Hero/Hero";
import Slider from "react-rangeslider";
import Axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

interface Team {
  abbreviation: string,
  city: string,
  conference: string,
  division: string,
  full_name: string,
  id: number,
  name: string,
  price: number
}

export class Sports extends Component<{}, {
  adStyle?: CSSProperties,
  teams?: Team[],
  selectedPrice: number,
  sortByPrice?: boolean,
  sortByDescending?: boolean,
  displayedSelectedPrice: number,
  searchQuery?: string,
  teamsPerPage: string | number,
  selectedPage: number,
}> {

  private teamPrices = [99, 120, 92, 115, 134, 101, 123, 92, 89, 105, 112, 113, 121, 130, 110, 120, 108, 109, 107, 98, 85, 135, 143, 111, 118, 103, 134, 125, 104, 108];
  private toolbar: React.RefObject<HTMLDivElement>;
  private bottomContentTopMargin = 50;
  private maxPrice: number;
  private minPrice: number;
  private teamsColumns: JSX.Element[][] = [];
  private sliderBeingUsed = false;

  constructor(props: {}) {
    super(props);
    this.toolbar = React.createRef();
    this.maxPrice = Math.max(...this.teamPrices);
    this.minPrice = Math.min(...this.teamPrices);
    this.state = {
      selectedPrice: this.maxPrice,
      displayedSelectedPrice: this.maxPrice,
      teamsPerPage: 'All',
      selectedPage: 0
    }
  }

  componentDidMount() {
    if (!this.state?.teams) {
      Axios.get("https://free-nba.p.rapidapi.com/teams?page=0", {
        headers: {
          "x-rapidapi-host": "free-nba.p.rapidapi.com", 
          "x-rapidapi-key": "e5d8563997mshcfb030c802400d3p1ec262jsn6864acf2d34a" 
        }
      }).then((response: any) => {
        this.setState({
          teams: response.data.data.map((team: Team, i: number) => {
            return {
              ...team,
              price: this.teamPrices[i]
            }
          })
        });
      }).catch(error => {
        console.error(error);
      });
    }
    if (this.toolbar.current) {
      this.setState({
        adStyle: {
          marginTop: this.toolbar.current.clientHeight + this.bottomContentTopMargin
        },
      });
    }
  }

  render() {
    const teams = this.state?.teams?.slice().filter(team => {
      const searchQuery = this.state?.searchQuery;
      return team.price <= this.state?.selectedPrice && (!searchQuery || Object.values(team).filter(value => String(value).toLowerCase().includes(searchQuery.toLowerCase())).length);
    });
    let pages = 1;
    if (teams && this.state.teamsPerPage !== 'All') {
      pages = teams.length / (this.state.teamsPerPage as number);
    } 
    return (
      <div id="sports">
        <Hero 
          title="Sports" 
          imgFilename="sports.jpg" 
          onChange={value => {
            this.setState({
              searchQuery: value
            });
          }}
        />
        <div>
          <div>
            <div ref={this.toolbar}>
              <div>
                <div>
                  {
                    ['Team', 'Price'].map(value => {
                      const active = this.state?.sortByPrice ? value === 'Price' : value === 'Team'; 
                      return (
                        <a 
                          key={value}
                          className={active ? 'active' : ''}
                          onClick={
                            () => {
                              if (active) {
                                this.setState({
                                  sortByDescending: !this.state.sortByDescending
                                });
                              } else {
                                this.setState({
                                  sortByDescending: false,
                                  sortByPrice: value === 'Price'
                                });
                              }
                            }
                          }
                        >
                          By {value} <FontAwesomeIcon icon={!this.state?.sortByDescending || !active ? faChevronUp : faChevronDown}/> 
                        </a>
                      ); 
                    })
                  }
                </div>
                <div>
                  <span>
                    Teams per page:
                  </span>
                  <select 
                    value={this.state.teamsPerPage}
                    onChange={value => {
                      this.setState({
                        teamsPerPage: value.target.value
                      });
                    }}
                  >
                    {
                      ['All', 10, 5].map(value => {
                        return (
                          <option
                            key={value}
                            value={value}
                          >
                            {value}
                          </option>
                        );
                      }) 
                    }
                  </select>
                </div>
              </div>
              <div>
                <label>
                  <span>
                    Maximum Price: &#36;{this.state?.displayedSelectedPrice} 
                  </span>
                </label>
                <div>
                  <span>
                    &#36;{this.minPrice}
                  </span>
                    <Slider 
                      value={this.state?.displayedSelectedPrice}
                      min={this.minPrice}
                      max={this.maxPrice}
                      onChangeStart={() => {
                        this.sliderBeingUsed = true;
                      }}
                      onChange={value => {
                        this.setState({
                          displayedSelectedPrice: value
                        });
                      }}
                      onChangeComplete={() => {
                        this.sliderBeingUsed = false;
                        this.setState({
                          selectedPrice: this.state?.displayedSelectedPrice,
                          selectedPage: 0
                        });
                      }}
                    />
                  <span>
                    &#36;{this.maxPrice}
                  </span>
                </div>
              </div>
            </div>
            <div style={{marginTop: this.bottomContentTopMargin}}>
              {
                (
                  () => {
                    if (!this.teamsColumns.length || !this.sliderBeingUsed) {
                      if (this.state?.sortByPrice) {
                        teams?.sort((a, b) => a.price - b.price)
                      }
                      if (teams) {
                        this.teamsColumns = [];
                        if (this.state?.sortByDescending) {
                          teams.reverse();
                        }
                        for (let page = 0; page < pages; page++) {
                          this.teamsColumns[page] = [];
                          for (let i = 0; i < 2; i++) {
                            this.teamsColumns[page].push(
                              <div key={i}>
                                {
                                  (
                                    () => {
                                      const teamDivs = [];
                                      const teamsPerPage = teams.length/pages;
                                      const currentTeams = teams.slice(teamsPerPage * page, teamsPerPage * (page + 1));
                                      const halfOfTeamsLength = currentTeams.length * 0.5;
                                      const start = Math.ceil(halfOfTeamsLength * i);
                                      const end = Math.ceil(halfOfTeamsLength * (i + 1));
                                      for (let k = start; k < end; k++) {
                                        const team = currentTeams[k];
                                        teamDivs.push(
                                          <div key={k}>
                                            <span>
                                              {team?.full_name}
                                            </span>
                                            <span>
                                              from <span>&#36;{team?.price}</span>
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
                        }
                      }
                    }
                    return this.state?.teams ? this.teamsColumns[this.state?.selectedPage] : <p>Loading teams...</p>;
                  }
                )()
              }
            </div>
            {
              teams?.length
              ?
              <div>
                <a onClick={() => {
                  const previousPage = this.state.selectedPage - 1;
                  if (previousPage > -1) {
                    this.setState({
                      selectedPage: previousPage 
                    });
                  }
                }}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </a>
                {
                  (
                    () => {
                      const pageButtons = [];
                      for (let i = 0; i < pages; i++) {
                        pageButtons.push(
                          <a 
                            className={this.state.selectedPage === i ? 'active' : ''}
                            key={i}
                            onClick={() => {
                              this.setState({
                                selectedPage: i
                              });
                            }}
                          >
                            {i + 1}
                          </a>
                        );
                      }
                      return pageButtons;
                    }
                  )()
                }
                <a onClick={() => {
                  const nextPage = this.state.selectedPage + 1;
                  if (nextPage < pages) {
                    this.setState({
                      selectedPage: nextPage 
                    });
                  }
                }}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </a>
              </div>
              :
              this.state?.teams 
              ?
              <p>
                No teams match your options.
              </p>
              :
              null
            }
          </div>
          <div style={this.state?.adStyle}>
            Placeholder for promotional messaging
          </div>
        </div>
      </div>
    );
  }
}
