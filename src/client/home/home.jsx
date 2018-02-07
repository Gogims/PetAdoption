import React from 'react';

class Home extends React.Component {

    render() {
        const starterLink = "https://givingassistant.org/np#katies-roadside-rescue";

        return (
            <div>
                <p>
                    Welcome to Katie's Roadside Rescue website! Check back often as
                    it is a continuous work in progress as new things are added, dog
                    bios updated, upcoming events, etc. KRR LOVES your support.
                    Thank you for visiting.
                </p>
                {/* TODO: If rescue house is full */}
                <p>
                    KRR is currently not taking in any dogs and does not accept owner 
                    surrenders. We are at full capacity.
                </p>
                <p>
                    Or, you can use <b>Giving Assistant</b> to donate while you shop! It’s 
                    easy: Giving Assistant helps you donate a percentage of your cash 
                    back earnings to us with every purchase you make at 1800+ popular 
                    online retailers. You’ll also find useful <b>Macy's Coupons</b>, as well 
                    as big savings at places like <b>eBay, Target</b> and <b>Sears</b>!
                </p>
                <p>
                    Get started here: <a href={starterLink}>{starterLink}</a>
                </p>
                <p>
                    Finally - <b>everyone's favorite online shopping retailer - Amazon.com </b> - can donate to KRR too!
                </p>
            </div>
        )
    }
}

export default Home;