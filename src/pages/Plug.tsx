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
            src={`https://plus.unsplash.com/premium_photo-1664540776822-2c1f0bde9145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              У Львові вранці 50% споживачів мали електропостачання
            </Typography>
            <Typography
              variant="body2"
              textAlign="justify"
              color="text.secondary"
            >
              Щодесять хвилин ситуація в місті змінюється у зв’язку з
              включеннями електроенергії або аварійними вимкненнями. Заступниця
              міського голови Львова з питань житлово-комунального господарства
              Ірина Маруняк повідомила оперативну інформацію про ситуацію у
              місті станом на ранок після вчорашніх ракетних обстрілів, пише
              Dailylviv.com. Так, станом на 8:30 50% споживачів мають
              електропостачання у зв’язку з аварійними відключеннями. Через це
              точково в місті призупинено подачу тепла та гарячого
              водопостачання. Вода подається до 100% будинків. Автобуси їздять
              згідно з графіками, додатково випустили 10 автобусів. Через
              відсутність електроенергії електротранспорт працює на 85% (2
              трамвайних та 4 тролейбусних маршрути їздять за скороченим
              маршрутом) 60% світлофорів не працює. Всі навчальні заклади
              працюють у штатному режимі. Також у Львові працює 18 пунктів
              обігріву. «Кожних 10 хвилин ситуація в місті змінюється у зв’язку
              з включеннями електроенергії або аварійними вимкненнями», –
              зазначає Ірина Маруняк. Львів вже зі світлом, - Андрій Садовий На
              трьох АЕС спрацював аварійний захист, а ЗАЕС - у режимі повного
              блекауту ЄБРР надає 372 млн євро на аварійний ремонт енергетичної
              інфраструктури України В окремих районах Львова почало зявлятися
              світло
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
              Новини 23 листопада: всі українські АЕС зупинилися через обстріли,
              попередня угода України з МВФ
            </Typography>
            <Typography
              variant="body2"
              textAlign="justify"
              color="text.secondary"
            >
              Про енергетику. Через зниження частоти в енергосистемі України на
              Рівненській, Південноукраїнській та Хмельницькій АЕС спрацював
              аварійний захист, унаслідок чого всі енергоблоки були автоматично
              відключені. Обстріл призвів також до тимчасового знеструмлення
              більшості теплових та гідроелектростанцій, також уражені об‘єкти
              електропередачі. Про світло. Через російські обстріли
              диспетчерський центр НЕК Укренерго застосував аварійні відключення
              електроенергії по всій території України Про бюджет. Президент
              Володимир Зеленський підписав закон про державний бюджет України
              на 2023 рік Про МВФ. Україна та Міжнародний валютний фонд досягли
              попередньої згоди (staff level agreement) щодо моніторингової
              програми за участю правління фонду (PMB). Про генератори. Державна
              митна служба пояснила правила для ввезення генераторів в Україну,
              зокрема – які можна ввозити без письмової декларації. Водночас
              замовити на іноземних маркетплейсах з доставкою в Україну і не
              сплатити мита може не вдатися.
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
