import React from 'react';

import './footer.scss';


function Footer () {
    
    return (
        <footer>
            <div class="contact">
                  <span><a href="mailto: mailmail@mail.com">mailmail@mail.com</a></span>
                  <span>+45 66 66 66 66</span>
              </div>
              <div class="address">
                  <span>Nyvang 7, 4000 Roskilde</span>
                  <span>CVR: 111111</span>
              </div>
        </footer>
    )
}

export default Footer;