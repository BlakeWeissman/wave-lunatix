import React, {Component, CSSProperties} from 'react';
import './App.scss';
import {NavLink, BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Hero} from './components/Hero/Hero';
import {LargeInput} from './components/LargeInput/LargeInput';
import {NeoInput} from './components/NeoInput/NeoInput';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter, faFacebookF, faInstagram} from '@fortawesome/free-brands-svg-icons'

export class App extends Component<{}, {
  pageWrapperStyle: CSSProperties
}> {
  private navbar: React.RefObject<HTMLDivElement>;

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
                      <div key={categoryNumber}>
                        Category {categoryNumber}
                      </div>
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
                      <div key={eventNumber}>
                        Event {eventNumber}
                      </div>
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
              <Hero title="Sports" imgFilename="sports.jpg" />

            </Route>

            <Route path="/subscribe">
              <div id="subscribe">
                <div>
                <h1>
                  Subscribe
                </h1>
                  <div>
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
                  </div>
                </div>
              </div>
            </Route>

            <Route path="/cart">
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
