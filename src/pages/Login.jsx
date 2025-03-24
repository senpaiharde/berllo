import { useState } from "react";
import '../styles/loginpage.scss';



export function Login() {
    const [email, setEmail] = useState('');

    return (
        <div className="login">
            <div className="inside-div">
      <div className="login-container">
        {/* Trello Logo */}
        <div className="header-login">
            <div className="logo-container">
          <img src='https://www.vectorlogo.zone/logos/trello/trello-ar21.svg' 
          alt="terllo logo" className="terllo-logo"/>
          </div> 
          <div className="login-div">
            <h5 className="login-continue">Log in to continue</h5>
            </div>
          
        </div>
  
        {/* Login Card */}
        <div className="login-card">
          
          <form>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="remember-me-div">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
              </div>
            </div>
            <button className="continue-btn">Continue</button>
          </form>
  
          <div className="separator">
            
            <span>Or continue with:</span>
            
          </div>
  
          <div className="social-login">
            {[ 
              { name: "Google", src: 'https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg'},
              { name: "Microsoft", src: 'https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/microsoft-logo.c73d8dca.svg'},
              { name: "Apple", src: 'https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/apple-logo.54e0d711.svg'},
              { name: "Slack", src: 'https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/slack-logo.5d730c10.svg'}
            ].map(({ name, src }) => (
              <button key={name} className="social-btn">
                <img src={src} alt={name} />
                <span>{name}</span>
              </button>
            ))}
          </div>
   
          <div className="login-links">
          
            <a href="#">Can't log in?</a>
            <span className="dot-separator">·</span>
            <a href="#">Create an account</a>
            
          </div>
          <hr />
  
          {/* Footer */}
          <div className="login-footer">
          
            <span className="atlassian-logo">ⓒ ATLASSIAN</span>
            <p>One account for Trello, Jira, Confluence, and more.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <span className="dot-separator">·</span>
              <a href="#">User Notice</a>
            </div>
            <p className="captcha-info">This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.</p>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  };
  