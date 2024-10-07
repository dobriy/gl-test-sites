import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './App.css';

const COUNT_LIMIT = 10;

// can we use React hooks instead??
// probably but for now we do it the old 
// fashioned way
class App extends React.Component {

    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

   constructor( props ) {
     super( props );

     const { cookies } = props;
     this.state = {
         count: parseInt(cookies.get('count')) || 0,
     };
   }

   componentDidMount(){
      const { cookies } = this.props;
      this.setState((prevState) => ({
          count: prevState.count + 1
      }), function () {cookies.set('count', this.state.count, { path: '/' })});
   }

   render() {
    let display = (
        <p>
            Number of hits: {this.state.count}
        </p>
    ); // Declare `display` outside the if condition to ensure it's accessible in the entire method scope.
  
    if (this.state.count > COUNT_LIMIT) {
      display = this.regform();

    } else {
      display = (
        <p>
          Number of hits: {this.state.count}
        </p>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          {display}
        </header>
      </div>
    );
  }

  regform() {
    return <div className="g-outer g-grey tight">
      <div className="g-inner">
        <div className="g-grid">
          <div className="g-grid-col x12">
            <section className="g-ui-box">
              <h1 style={{ fontSize: '28px' }}>Registration</h1>
              <p>
                Please enter the registration number and postcode for each person (aged 13 or over) for whom you are
                buying a ticket. You may enter up to 4 people's registration details, but can only purchase 1 ticket per registration.
              </p>
              <p>Please enter your Glastonbury registration details below.</p>
              <form method="post" action="/gfl/addregistrations" id="mainRegForm" noValidate>
                <input id="GlastonburyEventId" name="GlastonburyEventId" type="hidden" value="DF-1450001" />

                <h3 className="reg-header" style={{ marginTop: '30px' }}>YOUR DETAILS</h3>
                <div className="add-registration lead-reg-marg">
                  <label style={{ marginTop: '15px' }}>Registration Number: </label>
                  <input className="numeric valid" id="registrations_0__RegistrationId" maxLength="30" name="registrations[0].RegistrationId" type="text" value="1090813594" />
                  <label style={{ marginTop: '15px' }}>Postcode: </label>
                  <input className="postcode valid" id="registrations_0__PostCode" maxLength="30" name="registrations[0].PostCode" style={{ textTransform: 'uppercase' }} type="text" value="E2 0HN" />
                </div>

                <h3 className="reg-header">ADD UP TO 3 ADDITIONAL REGISTRATIONS</h3>
                <div className="add-registration">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index}>
                      <span className="guest-count">#{index + 1}</span>
                      <label style={{ marginTop: '15px' }}>Registration Number: </label>
                      <input className="numeric" id={`registrations_${index + 1}__RegistrationId`} maxLength="30" name={`registrations[${index + 1}].RegistrationId`} type="text" />
                      <label style={{ marginTop: '15px' }}>Postcode: </label>
                      <input className="postcode" id={`registrations_${index + 1}__PostCode`} maxLength="30" name={`registrations[${index + 1}].PostCode`} style={{ textTransform: 'uppercase' }} type="text" />
                      <div className="reg-divider">&nbsp;</div>
                    </div>
                  ))}
                </div>

                <button className="g-button primary small">Proceed</button>
                <p className="clear-form g-small-print"><a href="javascript:void(0)">Clear registration form</a></p>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default withCookies(App);
