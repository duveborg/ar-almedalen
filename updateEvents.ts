import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dateFns from 'date-fns';
import * as fs from 'fs';

const days = 5;
const eventStartDate = new Date('2022-07-03');

const entries = [];

type Entry = {
  html: string;
};

for (let i = 0; i < days; i++) {
  const programs = await axios.get<{ events: Entry[] }>(
    `https://almedalsveckan.info/servlet/program?searchYear=2022&searchDay=${i}&webcast=false`
  );
  const programsData = programs.data;
  programsData.events.forEach(async ({ html }) => {
    const $ = cheerio.load(html);
    const id = $('.eventcont').attr('meta-id');

    const additionalInfo = await axios.get<Entry>(
      `https://almedalsveckan.info/servlet/program?additionalInfo=${id}`
    );
    const additionalHtml = additionalInfo.data.html;
    const $extra = cheerio.load(additionalHtml);

    const time = $('.event_time').text().split(' - ');
    const startTime = dateFns.parse(time[0], 'HH:mm', eventStartDate);
    const endTime = dateFns.parse(time[1], 'HH:mm', eventStartDate);
    const lat = $extra('.latitude').val();
    const lng = $extra('.longitude').val();
    const food = additionalHtml.indexOf('Förtäring: Ja') > -1;
    const description = $extra('.event_resume').text();

    const nameNode = $('.event_name');
    nameNode.find('.eventtimespan').remove();
    const name = nameNode.text();

    const entry = {
      startTime,
      endTime,
      name,
      lat,
      lng,
      food,
      description,
    };

    entries.push(entry);
  });

  console.log(`Day ${i} fetched`);
}

fs.writeFileSync('entries.js', 'var entries = ' + JSON.stringify(entries));

console.log(`Fetched ${entries.length} entries`);
