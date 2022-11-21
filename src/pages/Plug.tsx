import React from 'react';
import NoAuthTokenRestriction from 'routes/restriction/NoAuthTokenRestriction';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from '@mui/material';
import Header from 'components/Header';

export const Plug = () => {
  return (
    <NoAuthTokenRestriction>
      <Header />
      <Box
        margin={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Card elevation={10} sx={{ maxWidth: 900, borderRadius: 2 }}>
          <CardMedia
            component="img"
            height="250"
            src={`https://images.unsplash.com/photo-1668881233694-1825a663b2a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography
              variant="body2"
              textAlign="justify"
              color="text.secondary"
            >
              Lizards are a widespread group of squamate reptiles, with over
              7,000 species, ranging across all continents except Antarctica, as
              well as most oceanic island chains. The group is paraphyletic
              since it excludes the snakes and Amphisbaenia although some
              lizards are more closely related to these two excluded groups than
              they are to other lizards. Lizards range in size from chameleons
              and geckos a few centimeters long to the 3-meter-long Komodo
              dragon. Most lizards are quadrupedal, running with a strong
              side-to-side motion. Some lineages, have secondarily lost their
              legs, and have long snake-like bodies. Some such as the
              forest-dwelling Draco lizards are able to glide. They are often
              territorial, the males fighting off other males and signalling,
              often with brightly colours, to attract mates and to intimidate
              rivals. Lizards are mainly carnivorous, often being sit-and-wait
              predators; many smaller species eat insects, while the Komodo eats
              mammals as big as water buffalo. Lizards make use of a variety of
              antipredator adaptations, including venom, camouflage, reflex
              bleeding, and the ability to sacrifice and regrow their tails.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card
          elevation={10}
          sx={{ marginTop: 10, maxWidth: 900, borderRadius: 2 }}
        >
          <CardMedia
            component="img"
            height="250"
            src={`https://plus.unsplash.com/premium_photo-1668383209687-84821b873259?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography
              variant="body2"
              textAlign="justify"
              color="text.secondary"
            >
              Lizards are a widespread group of squamate reptiles, with over
              7,000 species, ranging across all continents except Antarctica, as
              well as most oceanic island chains. The group is paraphyletic
              since it excludes the snakes and Amphisbaenia although some
              lizards are more closely related to these two excluded groups than
              they are to other lizards. Lizards range in size from chameleons
              and geckos a few centimeters long to the 3-meter-long Komodo
              dragon. Most lizards are quadrupedal, running with a strong
              side-to-side motion. Some lineages, have secondarily lost their
              legs, and have long snake-like bodies. Some such as the
              forest-dwelling Draco lizards are able to glide. They are often
              territorial, the males fighting off other males and signalling,
              often with brightly colours, to attract mates and to intimidate
              rivals. Lizards are mainly carnivorous, often being sit-and-wait
              predators; many smaller species eat insects, while the Komodo eats
              mammals as big as water buffalo. Lizards make use of a variety of
              antipredator adaptations, including venom, camouflage, reflex
              bleeding, and the ability to sacrifice and regrow their tails.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </NoAuthTokenRestriction>
  );
};
