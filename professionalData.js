export const name = 'FVI Student';
export const title = 'Javascript Ninja';
export const introLabel = 'The Interactive Resume Of';
export const overview = 'Overview';
export const chartLabels = ['Design', 'DOM', 'CSS', 'APIs']
export const values = 'Professional Values';
export const lifeLearn = {h1:'Life Long \nLearning ', h2: 'Consistent analysis of innovation and \nself-motivated pursuit of knowledge.'};
export const tdd = {h1:'Test Driven \nDevelopment', h2: 'All code is innocent until proven guilty.'};
export const mr = {h1:'Modularity + \nReusabilty', h2:'Design components/systems \nto be useful  in multple scenarios.'};
export const agile = {h1:'Agile Methods', h2:'Evolutionary development, continuous \nintegration, flexible response to change.'};
export const ee = {h1:'Engineering \nElegance', h2:'The most effective solutions are often \nthe most minimal'};
export const tools = 'Tools';
export const termContent = [
  "favoriteTools = {",
  "\t\t\t'Mobile':['React Native', 'Ionic']",
  "\t\t\t'Gaming/High Interactivty': ['Phaser.io', 'Canvas API']",
  "\t\t\t'DOM Manipulation' : ['jQuery', 'Angular', 'pHp'],",
  "\t\t\t'CSS Frameworks' : ['MaterializeCSS', 'Bootstrap'],",
  "\t\t\t'Back End' : ['Express','Socket.io'],",
  "\t\t\t'Database' : ['Mongo DB', 'MySQL'],",
  "\t\t\t'User Interface' : ['Balsamiq’,'Sketch','Photoshop']",
  "\t}"
 ];

export const markers =['Skills', 'Projects', 'Credentials']


export const skills = {
  banners:['Design', 'Front End', 'Back End', 'Electrical Engineering'],
  levels:['beginner', 'familiar','proficient', 'expert'],
  design:['Illustrator','Photoshop', 'Balsamiq'],
  frontEnd:['React','BootStrap','jQuery','D3'],
  backEnd:['Flask','Node/Express','MongoDB'],
  dataScience:['Scipy/Numpy','pandas', 'Econometrics'],
  electricalEngineering:['Embedded C', 'Schematic Development',  'PCB Routing', 'Seeed Studio Production Cycle', 'System Simulation', 'Sensors and Actuators']
};

export const projects = {
  labels: ['SHARE', 'LEARN MORE'],
  'bitFarm':{
    tagline:'Grow food from your phone.',
    chart:{
      'Mechanical Engineering': 0.2,
      'Sensors & Actuators':0.3,
      'Hardware Development': 0.3,
      'User Experience': 0.2
    }
  },
  'comSim':{
    tagline:'Model digital communication systems.',
    chart:{
      'User Interface':0.2,
      'Data Visualization': 0.3,
      'Numerical Computing': 0.3,
      'Electrical Engineering':0.3,
    }
  },
  'Parity':{
    tagline:'Simplifying randomized control trials for social programs',
    chart:{
      'User Interface':0.3,
      'Data Visualization': 0.2,
      'Numerical Computing': 0.3,
      'Econometrics':0.3
    }
  }
};


export const credentials = {
  button: 'verify this',
  'Formal Education':{
    degree: ['BS Electrical Engineering', 'BA Communication'],
    year:[2006, 2014],
    school:['Loyola University Chicago', 'Oregon Institute of Technology'],
    minors:['Mechanical Engineering', 'Conflict Resolution']
  },
  'Continuing Education':{
    course:['Embedded Systems', 'Introduction to Computer Science', 'MongoDB for Developers', 'jQuery Fundamentals', 'Systems View of Communication (3 Part Series)', 'HTML5 Essentials and Best Practices', 'Front-End Web UI Frameworks and Tools'],
    provider:['UT Austin - edX', 'MIT - edX', 'MongoDB University', 'Microsoft - edX', 'W3C - edX', 'HKUST - Coursera']
  },
  'Certifications':{
    title:['Engineer In Training', 'Ceritified Associate in Project Management', 'Green Associate'],
    provider:['California Board for Professional Engineers', 'Project Management Institute', 'US GreenBuild Council']
  }
};


export const contactMsg = 'If you have a project similar to mine or would like to help me, I would love to receive your message.  I am also interested in finding a mentor or mentoring.  No recruiters please.';
