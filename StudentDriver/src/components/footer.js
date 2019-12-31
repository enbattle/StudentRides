import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <div>
        <footer className="footer">
          <div className="container-fluid">
            <div className ="row">
              <div className = "col-12 d-flex footer-container">
                <p className="list-inline-item">&copy; EdVoR 2019
                  <span className = "list-inline-item icon-footer text-center">
                    <a className = "facebook social-icon" href="https://github.com/enbattle/StudentRides">
                      <i className="fab fa-github" aria-hidden="true"></i>
                    </a>
                    <a className = "youtube social-icon" href="https://www.youtube.com/user/PartialCreditRPI">
                      <i className="fab fa-youtube-square" aria-hidden="true"></i>
                    </a>
                    <a className = "instagram social-icon" href="https://www.instagram.com/partialcredit/">
                      <i className="fab fa-instagram" aria-hidden="true"></i>
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
      </footer>
      </div>
    )
  }
}

export default Footer
