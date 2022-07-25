import { Container, Text } from "@chakra-ui/layout";
import axios from 'axios';
import cheerio from 'cheerio';
import { useRouter } from "next/router";
import { Flex, Spacer, Box } from '@chakra-ui/react'
const league_api = `${process.env.league_api}`;

function toSearchName(name){
  return name.replace(/[^0-9a-z]/gi, '').toLowerCase()
}


export async function getServerSideProps(context) {
  let elements = []
  await axios.get('https://keeptradecut.com/dynasty-rankings')
    .then(res => {
      let $ = cheerio.load(res.data)
      $('.onePlayer').each((index, element) => {
        const name = $(element).find('.player-name a').text().replace(' III', '');
        elements.push({
            name: name,
            searchName: toSearchName(name),
            value: $(element).find('.value p').text(),
            team: $(element).find('.player-name span.player-team').text(),
            position: $(element).find('div.position-team p.position').text().slice(0, 2)
        })
      });
    })
  .catch(error => {
    console.error(error);
  });
  
  console.log(elements.slice(0,20))
  const trade_id = context.params.id
  const tradesRes = await fetch(`${league_api}/league/trades`)
  const tradesData = await tradesRes.json();
  const trade = tradesData.find(t => {
    return t.transaction_id == trade_id;
  });
  console.log(trade)
  console.log(trade.trade_parts)
  trade.trade_parts.forEach(tp => {
    let partsValue = 0
    tp.adds.forEach(add => {
      let value = {"value":0};
      var regexmatch = add.match(/\((.*)\)/);
      if(regexmatch){
        value = elements.find(e => {return e.searchName == toSearchName(regexmatch[1])})
      } else if(add.startsWith("20")){
        value = elements.find(e => {return e.searchName == toSearchName(add.replace(" ", " Mid "))})
      } else { 
        value = elements.find(e => {return e.searchName == toSearchName(add)});
      }
      if(value){
        console.log(add + " = " + value.value)
        partsValue+=parseInt(value.value);
      } else {
        console.log("Couldn't determine value of " + add)
      }
    })
    tp.value=partsValue
  });

  console.log(trade)
  //normalise trades to get value
  //fuzzy search for player value
  
  return { props: { trades: trade } };
}

export default function Trade({ trades }) {
  const router = useRouter();
  console.log(trades.trade_parts)

  return (
    <Container maxW="container.xl">
      {trades.trade_parts.map((trade_part) => ( 
         <Box p='3'>
          <Text>{trade_part.newRoster}</Text>
          {trade_part.adds.map((add) => ( 
            <Text>{add}</Text>
          ))}
          <Text>{trade_part.value}</Text>
        </Box>
      ))}
      <Text>Bad deal for all involved. Can't believe you clowns keep doing this. (All picks are estimated as mid round picks, past ones are valued at 0 for now)</Text>
    </Container>
  );
}
