var clockCountries = {
  'in': { name: 'India', flag: 'https://flagcdn.com/w40/in.png', city: 'New Delhi', offset: 330, code: 'in' },
  'us': { name: 'USA', flag: 'https://flagcdn.com/w40/us.png', city: 'New York', offset: -300, code: 'us' },
  'gb': { name: 'UK', flag: 'https://flagcdn.com/w40/gb.png', city: 'London', offset: 60, code: 'gb' },
  'ae': { name: 'UAE', flag: 'https://flagcdn.com/w40/ae.png', city: 'Dubai', offset: 240, code: 'ae' },
  'sa': { name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png', city: 'Riyadh', offset: 180, code: 'sa' },
  'qa': { name: 'Qatar', flag: 'https://flagcdn.com/w40/qa.png', city: 'Doha', offset: 180, code: 'qa' },
  'sg': { name: 'Singapore', flag: 'https://flagcdn.com/w40/sg.png', city: 'Singapore', offset: 480, code: 'sg' },
  'au': { name: 'Australia', flag: 'https://flagcdn.com/w40/au.png', city: 'Sydney', offset: 660, code: 'au' },
  'de': { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png', city: 'Berlin', offset: 60, code: 'de' },
  'ca': { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', city: 'Toronto', offset: -240, code: 'ca' },
  'fr': { name: 'France', flag: 'https://flagcdn.com/w40/fr.png', city: 'Paris', offset: 60, code: 'fr' },
  'nl': { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png', city: 'Amsterdam', offset: 60, code: 'nl' },
  'jp': { name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png', city: 'Tokyo', offset: 540, code: 'jp' },
  'cn': { name: 'China', flag: 'https://flagcdn.com/w40/cn.png', city: 'Beijing', offset: 480, code: 'cn' },
  'kr': { name: 'South Korea', flag: 'https://flagcdn.com/w40/kr.png', city: 'Seoul', offset: 540, code: 'kr' },
  'za': { name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png', city: 'Johannesburg', offset: 120, code: 'za' },
  'br': { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png', city: 'Brasilia', offset: -180, code: 'br' }
};

var currentClockTz = localStorage.getItem('ml_clock_tz') || 'in';

function getTzAbbr(offset) {
  var abbrs = { 330: 'IST', 60: 'GMT', -300: 'EST', -240: 'EDT', -180: 'BRT', 120: 'SAST', 180: 'AST', 240: 'GST', 480: 'SGT', 540: 'JST', 660: 'AEST' };
  return abbrs[offset] || 'UTC' + (offset >= 0 ? '+' : '') + (offset / 60);
}

function tickFloatClock() {
  var c = clockCountries[currentClockTz];
  if (!c) { currentClockTz = 'in'; c = clockCountries['in']; }
  var now = new Date();
  var utc = now.getTime() + now.getTimezoneOffset() * 60000;
  var t = new Date(utc + c.offset * 60000);
  var h24 = t.getHours(), h = h24 % 12, m = t.getMinutes(), s = t.getSeconds();
  var ampm = h24 >= 12 ? 'PM' : 'AM';
  var h12 = h || 12;
  var fh = document.getElementById('fcH');
  var fm = document.getElementById('fcM');
  var fs = document.getElementById('fcS');
  var ftz = document.getElementById('fcTz');
  var fdig = document.getElementById('fcDigital');
  if (fh) fh.style.transform = 'translateX(-50%) rotate(' + (h * 30 + m * 0.5) + 'deg)';
  if (fm) fm.style.transform = 'translateX(-50%) rotate(' + (m * 6 + s * 0.1) + 'deg)';
  if (fs) fs.style.transform = 'translateX(-50%) rotate(' + (s * 6) + 'deg)';
  if (ftz) ftz.textContent = c.name + ' (' + getTzAbbr(c.offset) + ')';
  if (fdig) fdig.textContent = String(h12).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0') + ' ' + ampm;
}

function setClockTimezone(code) {
  if (clockCountries[code]) {
    currentClockTz = code;
    localStorage.setItem('ml_clock_tz', code);
    tickFloatClock();
  }
}

var clockOrder = ['in','us','gb','ae','sa','qa','sg','au','de','ca','fr','nl','jp','cn','kr','za','br'];

function cycleClock() {
  var idx = clockOrder.indexOf(currentClockTz);
  var next = clockOrder[(idx + 1) % clockOrder.length];
  setClockTimezone(next);
}

document.addEventListener('DOMContentLoaded', function() {
  tickFloatClock();
  setInterval(tickFloatClock, 1000);
  var el = document.getElementById('floatClock');
  if (el) el.addEventListener('click', cycleClock);
});
