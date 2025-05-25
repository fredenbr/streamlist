import './About.css'

const About = () => {
    return(
        <div className="about-container">
            <img 
                src="https://images.unsplash.com/photo-1581905764498-0a902d1d5b05"
                alt="Movie"
                className="about-image"
            />
            <h1>About Us</h1>
            <p>
                Here at EZTechMovie our mission is to provide a seamless movie watching experience to all customers. Take full advantage of our subscriptions.<br></br>
                From Basic to Social Media Sharing subscriptions, you can watch your favorite movies anytime. Save your favorite titles to watch later! <br></br><br></br>
                Now featuring, StreamList! StreamList is your go-to app for tracking and sharing your favorite movies and shows.<br>
                </br>Whether you're a casual viewer or cinema fanatic, StreamList helps you keep your watchlist organized and connected.
            </p>
        </div>
    )
}


export default About;
