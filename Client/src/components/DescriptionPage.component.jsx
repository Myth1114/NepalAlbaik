import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  grid: {
    padding: 20,
  },
}));

export default function Description() {
  const classes = useStyles();
  return (
    // <Container maxWidth="lg">
    <Grid className={classes.grid} container direction="column">
      <Grid>
        <h2>
          Bodybuilding, Fitness, Health & Nutritional Supplements Online Store
        </h2>
        <Typography variant="body1" align="justify">
          Being fit requires more than exercise/workout.You need proper
          nutrition and supplement to keep up with your fitness goals along with
          the time constraints. All you need is a one-stop-shop where it's more
          than just buying and Muscle Nepal is one solution to your many
          problems. Right from guiding on personal fitness training to
          consulting about necessary supplements and protein, it keeps you at
          ease in buying 100% genuine and authentic health supplements. We cater
          to all your fitness needs through our online channel across all cities
          in India. Muscle Nepal works as your nutritionist, supplement/protein
          expert, and provider of all the necessary tools and products you need
          to stay fit.
        </Typography>
        <h2>Our Speciality</h2>
        <Typography variant="body1">
          Muscle Nepal entered the fitness world with a pledge to deliver
          authenticity. From whey protein, mass gainers, pre/post workout
          essentials, to any other nutritional supplement/ product you need,
          Muscle Nepal is your go-to fitness expert.
        </Typography>
        <h2>Why choose Muscle Nepal?</h2>
        <Typography variant="body1" gutterBottom>
          As a large lot is into fitness and wellness, we vow to deliver them
          authenticity. You must be wondering how do we keep a check on it.
          Here's why you should rely upon Muscle Nepal:
        </Typography>
        <h3>Authentic Online Protein Supplements: </h3>
        <Typography variant="body1" gutterBottom>
          Muscle Nepal has reduced the gap between the importer and the
          customer, which keeps the products away from adulteration in terms of
          quality and quantity. You can check our authenticity page for more
          details.{" "}
        </Typography>
        <h3>Affordable Rates:</h3>
        <Typography variant="body1" gutterBottom>
          Buy genuine, stay fit is our motto, which applies to everything in
          terms of affordable pricing, superior quality, and quantity.
        </Typography>
        <h3>Top authentic brands:</h3>
        <Typography>
          Muscle Nepal has tied up with renowned and genuine fitness brands to
          cater to your fitness goals. To find more about our top 15 brands,
          check our brand's page.
        </Typography>
        <h3>Categories We Offer</h3>
        <Typography>
          No matter what product you need to sustain your training, you can be
          sure to find it in our supplement range. We give you several ranges of
          products under each category that you can choose based on your
          training level and requirements. The categories of supplements that
          you can choose from include
        </Typography>
        <h3>
          Protein Supplements: Specially Formulated For Better Performance
        </h3>
        <Typography>
          For those leading an active lifestyle, a protein supplement is a basic
          requirement. Physically active individual requires a certain amount of
          protein to ensure that the body is constantly repairing itself to
          allow good performance and quick results. You get the supreme quality
          whey protein supplements including Whey Protein Isolate and Whey
          Protein Concentrates our Protein section. Protein supplement products
          are packed in a high amount of quality proteins derived from some of
          the authentic sources. The body easily absorbs them and is the most
          convenient option to get the added protein intake you require.
        </Typography>
        <h3>
          Mass Gainers/Weight Gainers: For Your Muscle and Mass Gain Needs
        </h3>
        <Typography>
          Gaining mass is not a cakewalk. You require a lot more calories which
          cannot be fulfilled by your regular diet alone. This is because of
          time constraints or the inability to eat as many meals as you need for
          this calorie intake. Our Mass Gainer Supplements give you a safe and
          easy option to get the right amount of calories from the cleanest
          sources.
        </Typography>
        <h3>
          Pre/Post Workout Supplements: Helps You To Hustle For That Muscle
        </h3>
        <Typography>
          Post/Pre Workout Supplements are formulated to give you nutrients that
          you need for the power-packed energy during your workout and for quick
          recovery after training. Our Post and Pre-Workout supplements give you
          that quick boost of energy and delay muscle fatigue with natural
          stimulants and necessary nutrients which makes them safe to use.
          Pre/Post-Workout Supplements also provide amino acids like
          Beta-Alanine and Creatine that ensure a quick recovery and helps in
          muscle building.
        </Typography>
        <h3>BCAAs: Suit Your Bodybuilding Goals</h3>
        <Typography>
          One thing that is as important as planning a good workout strategy is
          planning your recovery process. Unless your muscles are able to
          recover fast, you will not be able to increase the intensity of your
          training or even sustain your current training regime. BCAA Powder and
          other amino acid supplements pack in the most essential nutrients to
          help your starved muscles get the nutrition that they need in order to
          recover faster. An added advantage of supplements like BCAA Supplement
          is that you can prevent any catabolic muscle loss that may stand in
          the way of your results.
        </Typography>
        <h3>Weight Loss Supplements: Get Rid Of Those Extra Kilos</h3>
        <Typography>
          Shedding those extra kilos and unwanted fat is one of the daunting and
          exhausting tasks. Even with seasoned bodybuilders and athletes,
          maintaining correct body fat is an important part of their fitness
          journey. To help you get that dream physique, we have a wide range of
          Fat Burners that boost metabolism to help you burn fat naturally and
          effectively. With these quality weight loss supplements, you do not
          have to worry about any side effects as they contain natural extracts
          that help you reach your weight loss goals faster.
        </Typography>
      </Grid>
    </Grid>
    // </Container>
  );
}
