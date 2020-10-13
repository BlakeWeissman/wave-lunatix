import React, {Component, CSSProperties, useEffect} from 'react';
import './App.scss';
import {NavLink, HashRouter, Switch, Route, Link, useLocation} from 'react-router-dom';
import {Hero} from './components/Hero/Hero';
import {LargeInput} from './components/LargeInput/LargeInput';
import {NeoInput} from './components/NeoInput/NeoInput';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter, faFacebookF, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {DialogPage} from './components/DialogPage/DialogPage';
import {Sports} from './components/Sports/Sports';
import {faUserCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export class App extends Component<{}, {
  pageWrapperStyle?: CSSProperties,
  videoPlayed: boolean
}> {

  private navbar: React.RefObject<HTMLDivElement>;
  private navbarWrap: React.RefObject<HTMLDivElement>;
  private video: React.RefObject<HTMLVideoElement>;
  private lastActivatedBreakpoint: number = window.innerWidth;

  constructor(props: {}) {
    super(props);
    this.navbar = React.createRef();
    this.navbarWrap = React.createRef();
    this.video = React.createRef();
    this.state = {
      videoPlayed: false
    };
  }

  setSitePadding(): void {
    this.setState({
      pageWrapperStyle: { 
        paddingTop: this.navbar.current?.clientHeight
      },
    });
  }

  componentDidMount() {
    this.setSitePadding();
    window.scrollTo(0, 0);
  }

  render() {
    const toggleNav = () => {
      this.navbarWrap.current?.classList.toggle('open');
      document.body.classList.toggle("no-scroll");
    }
    document.addEventListener('click', event => { 
      const target = event.target as HTMLElement;
      if (this.navbarWrap.current?.classList.contains('open') && (target?.tagName === "A" || target?.id === "nav-wrapper")) {
       toggleNav();
      }
    });
    const breakpoint = 1030;
    window.addEventListener('resize', () => {
      if ((this.lastActivatedBreakpoint >= breakpoint && window.innerWidth < this.lastActivatedBreakpoint) || (this.lastActivatedBreakpoint <= breakpoint && window.innerWidth > this.lastActivatedBreakpoint)) {
        this.lastActivatedBreakpoint = window.innerWidth;
        this.setSitePadding();
      }
    });
    return (
      <HashRouter>
        <ScrollToTop />
        <div 
          id="navbar" 
          ref={this.navbar}>
          <div>
            <Link to="/">
              <img src={require('./assets/logo.png')} alt="logo" />
            </Link>
            <div ref={this.navbarWrap} id="nav-wrapper">
              <div>
                <button onClick={toggleNav}>
                  <span />
                  <span />
                </button>
                <div>
                  <NavLink exact to="/">
                    Events
                  </NavLink>
                  <NavLink to="/sports">
                    Sports
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/cart">
                    My Tickets <FontAwesomeIcon icon={faUserCircle} />
                  </NavLink>
                </div>
              </div>
            </div>
            <button onClick={toggleNav}>
              <span />
              <span />
              <span />
            </button>
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
                  <video 
                    ref={this.video}
                    onClick={() => {
                      if (!this.state.videoPlayed) {
                        this.setState({
                          videoPlayed: true
                        });
                        this.video.current?.play();
                      }
                    }}
                    src={require('./assets/video.mov')} 
                    width="500" 
                    poster={require('./assets/video.png')}
                    controls={this.state.videoPlayed}
                  />
                  <Link to="/subscribe">
                    <button>
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </Route>

            <Route path="/sports">
              <Sports />
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
                <div id="cart">
                  <h3>
                    My Cart
                  </h3>

                  <div>
                    <div>
                      <span>
                        Event 1
                      </span>
                      <p>
                        Venue
                        <br />
                        Date
                      </p>
                      <div>
                        <span>
                          Quantity
                        </span>
                        <select>
                          {
                            Array.from(Array(5), (e, i) => {
                              const number = i + 1;
                              return (
                                <option
                                  key={i}
                                  value={number}
                                >
                                  {number}
                                </option>
                              );
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div>
                      <span>
                        &#36;1000
                      </span>
                      <a>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <Link to="/sports">
                      <button>
                        Continue Shopping
                      </button>
                    </Link>
                    <button>
                      Checkout
                    </button>
                  </div>
                </div>
              </DialogPage>
            </Route>

          </Switch>
          <footer>
            <div>
              <div id="apps">
                <a 
                  href="https://www.apple.com/app-store/" 
                  target="_blank"
                  rel="noopener noreferrer">
                  <img src={require('./assets/apple.jpg')} alt="App Store" />        
                </a>
                <a 
                  href="https://play.google.com/store" 
                  rel="noopener noreferrer"
                  target="_blank">
                  <img src={require('./assets/google.jpg')} alt="Google Play Store" />        
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
                  rel="noopener noreferrer"
                  target="_blank">
                  <img src={require('./assets/venmo.png')} alt="Venmo Logo" />        
                </a>
              </div>
              <p>
                About | Support | Terms And Conditions <br /> Copyright &#169; 2020 SI Tickets | All Rights Reserved
              </p>
              <div id="social">
                <a
                  href="https://twitter.com/"
                  rel="noopener noreferrer"
                  target="_blank">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="https://facebook.com/"
                  rel="noopener noreferrer"
                  target="_blank">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  href="https://instagram.com"
                  rel="noopener noreferrer"
                  target="_blank">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    );
  }
}
