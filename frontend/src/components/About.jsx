import React from "react";
import "./About.css";
function About() {
  return (
    <div className="about-container">
      <h1>NEAREST SPACE</h1>
      <h2>Provide a high-level summary of your Project.</h2>
      <p>
        We have often talked about how incredible it was going into space and
        reach Mars with current technology. But have we thought about
        maintaining communication in real time with the astronauts who are in
        the outer space? THE NEAREST SPACE is especially focused on meeting
        these expectations to establish an interconnection with astronauts from
        one planet to another through a web application that allows to send
        messages in real time. This includes an action which allows to know at
        what time of the year the connection with users of planet Earth will be
        established. This App will list names with different similarities and in
        this way, it is possible to meet the objective set.
      </p>
      <h2>Describe how your Project addresses this challenge.</h2>
      <p>
        THE NEAREST SPACE will cover a long-term problem, which is the
        communication between Mars and Earth. In the future, colonies on Mars
        will be possible, and the problems that astronauts will have to deal
        with are, are their impossibility to communicate with their families, so
        the objective is to establish communication through a web application
        created with the MERN stack, whose base language is Javascript. On the
        client side, we use Framework React.js, on the server side Node.js with
        the Framework Express.js and as a DB database manager. Its main function
        will be to communicate and interconnect with family or friends between
        Earth and Mars.
      </p>
      <h2>Describe how you developed your Project.</h2>
      <p>
        Nowadays, the advances in space exploration have inspired many people,
        including our team. We focused especially on analyzing the situation in
        which astronauts find themselves when they are in the outer space. There
        is a lack of communication between the central plant, and family and
        friends. It is very important for us to provide a solution for this
        problem. The tools used in this web application were with the MERN stack
        whose base language is Javascript, on the client side we use Framework
        React.js, on the server side Node.js with the Framework Express.js and
        as a database manager Mongo DB. One of the challenges that the team had
        to address was to find a way to use the data provided by the associated
        space agencies, and on the other hand, one of the achievements was to
        find a lot of information about Mars, to know everything that is known
        about this planet so far.
      </p>
      <h2>How did you use space agency data in your project.</h2>
      <p>
        The associated space agencies provide relevant data for the
        implementation of this project, in this case we use InSight: Mars
        Weather Service API, to obtain the meteorological measurements of Mars,
        Temperature, wind speed and atmospheric pressure. According to these
        return parameters from the API, it is possible to know how it interferes
        in the communication of both planets, so our users will know when it
        will be the right moment to communicate, and thus, they will be able to
        have an idea of how survival is carried out there, due to the conditions
        under which they are exposed. It is crucial for the people of earth to
        know more about Mars, since it is a planet that can be colonized.
      </p>
    </div>
  );
}

export default About;
