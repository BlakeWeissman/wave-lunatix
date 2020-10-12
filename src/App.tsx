import React, {Component, CSSProperties, Props, FC, useState} from 'react';
import './App.scss';
import {NavLink, BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Hero} from './components/Hero/Hero';
import {LargeInput} from './components/LargeInput/LargeInput';
import {NeoInput} from './components/NeoInput/NeoInput';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter, faFacebookF, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {DialogPage} from './components/DialogPage/DialogPage';
import Axios from 'axios';
import Slider from 'react-rangeslider'

export class App extends Component<{}, {
  pageWrapperStyle: CSSProperties
}> {

  private navbar: React.RefObject<HTMLDivElement>;

  private Sports: FC = () => {
    const NBADataPrices = [99, 120, 92, 115, 134, 101, 123, 92, 89, 105, 112, 113, 121, 130, 110, 120, 108, 109, 107, 98, 85, 135, 143, 111, 118, 103, 134, 125, 104, 108];
    const [state, setState] = useState<{
      NBAData?: {
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
    }>();
    if (!state?.NBAData) {
      Axios.get("https://free-nba.p.rapidapi.com/teams?page=0", {
        headers: {
          "x-rapidapi-host": "free-nba.p.rapidapi.com", 
          "x-rapidapi-key": "e5d8563997mshcfb030c802400d3p1ec262jsn6864acf2d34a" 
        }
      }).then((response: any) => {
        console.log(response);
        console.log(response.data.data);
        setState({
          NBAData: response.data
        });
      }).catch(error => {
        console.error(error);
      });
    }
    return (
      <div id="sports">
        <Hero 
          title="Sports" 
          imgFilename="sports.jpg" 
        />
        <div id="content">
          <div>
            <div>
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
            <div>
              {
                state?.NBAData?.data.map((team, i) => {
                  return (
                    <div key={i}>
                      {team.full_name}
                      {NBADataPrices[i]}
                    </div>
                  ) 
                })
              }
            </div>
          </div>
          <div>
            Placeholder for promotional messaging
          </div>
        </div>
      </div>
    );
  }

  constructor(props: any) {
    super(props);
    this.navbar = React.createRef();
  }

  componentDidMount() {
    this.setState({
      pageWrapperStyle: { 
        paddingTop: this.navbar.current?.clientHeight
      },
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div 
          id="navbar" 
          ref={this.navbar}>
          <div>
            <Link to="">
              <img src={require('./assets/logo.png')} />
            </Link>
            <div>
              <NavLink to="">
                Events
              </NavLink>
              <NavLink to="/sports">
                Sports
              </NavLink>
            </div>
            <div>
              O
            </div>
          </div>
        </div>
        <div style={this.state?.pageWrapperStyle}>
          <Switch>
            <Route exact path="/">
              <Hero 
                centerText
                title="Magnanimus Tour" 
                imgFilename="purple-short.jpg" />
              <div id="categories">
                {
                  Array.from(Array(6), (e, i) => {
                    const categoryNumber = i + 1;
                    return (
                      <Link 
                        key={categoryNumber}
                        to="/subscribe"
                      >
                        <div>
                          Category {categoryNumber}
                        </div>
                      </Link>
                    );
                  })
                }
              </div>
              <div className="hr-container">
                <hr/>
              </div>
              <div className="cta">
                <h3>
                  Trending
                </h3>
                <Link to="/subscribe">
                  <button>
                    View All
                  </button>
                </Link>
              </div>
              <div id="events">
                {
                  Array.from(Array(4), (e, i) => {
                    const eventNumber = i + 1;
                    return (
                      <Link 
                        key={eventNumber}
                        to="/subscribe"
                      >
                        <div>
                          Event {eventNumber}
                        </div>
                      </Link>
                    );
                  })
                }
              </div>
              <div id="video-container">
                <div>
                  <img src={require('./assets/video.png')} />        
                  <Link to="/subscribe">
                    <button>
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </Route>

            <Route path="/sports">
              <this.Sports />
              
            </Route>

            <Route path="/subscribe">
              <div id="subscribe">
                <DialogPage title="Subscribe">
                  <div>
                    <NeoInput placeholder="First Name" />
                    <NeoInput placeholder="Last Name" />
                  </div>
                  <NeoInput placeholder="Email" />
                  <NeoInput placeholder="User Name" />
                  <NeoInput placeholder="Password" type="password" />
                  <NeoInput placeholder="Repeat Password" type="password" />
                  <span>
                    <input 
                      type="checkbox" 
                      id="vehicle1" 
                      name="vehicle1" 
                      value="Bike" />
                    <label htmlFor="vehicle1"> 
                      I Agree to the Terms of Use and Privacy Policy
                    </label>
                  </span>
                  <Link to="">
                    <button>
                      Sign Up
                    </button>
                  </Link>
                </DialogPage>
              </div>
            </Route>

            <Route path="/cart">
              <DialogPage>
                Cart
              </DialogPage>
            </Route>

          </Switch>
          <footer>
            <div>
              <div id="apps">
                <a 
                  href="https://www.apple.com/app-store/" 
                  target="_blank">
                  <img src={require('./assets/apple.jpg')} />        
                </a>
                <a 
                  href="https://play.google.com/store" 
                  target="_blank">
                  <img src={require('./assets/google.jpg')} />        
                </a>
              </div>
              <LargeInput 
                placeholder="Join our mailing list for exclusive access and promotions" 
                addonText="Subscribe" />
              <div id="venmo">
                <p>
                  Powered by
                </p>
                <a 
                  href="https://venmo.com/"
                  target="_blank">
                  <img src={require('./assets/venmo.png')} />        
                </a>
              </div>
              <p>
                About | Support | Terms And Conditions <br /> Copyright &#169; 2020 SI Tickets | All Rights Reserved
              </p>
              <div id="social">
                <a
                  href="https://twitter.com/"
                  target="_blank">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="https://facebook.com/"
                  target="_blank">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}
