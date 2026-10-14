export interface DataRow {
  id: string;
  [key: string]: string | number;
}

export interface DatasetDef {
  id: string;
  name: string;
  description: string;
  targetAttribute: string;
  attributes: string[];
  attributeValues: Record<string, string[]>;
  data: DataRow[];
}

/**
 * Play Tennis Dataset (Slide 93 of PPT)
 * 14 instances, 9 Yes, 5 No
 */
export const PLAY_TENNIS_DATASET: DatasetDef = {
  id: 'play-tennis',
  name: 'Play Tennis Dataset (Tom Mitchell / SNGCE Notes)',
  description: 'Classic 14-day weather observation dataset used to decide whether to play tennis.',
  targetAttribute: 'PlayTennis',
  attributes: ['Outlook', 'Temperature', 'Humidity', 'Wind'],
  attributeValues: {
    Outlook: ['Sunny', 'Overcast', 'Rain'],
    Temperature: ['Hot', 'Mild', 'Cool'],
    Humidity: ['High', 'Normal'],
    Wind: ['Weak', 'Strong'],
  },
  data: [
    { id: 'D1', Outlook: 'Sunny', Temperature: 'Hot', Humidity: 'High', Wind: 'Weak', PlayTennis: 'No' },
    { id: 'D2', Outlook: 'Sunny', Temperature: 'Hot', Humidity: 'High', Wind: 'Strong', PlayTennis: 'No' },
    { id: 'D3', Outlook: 'Overcast', Temperature: 'Hot', Humidity: 'High', Wind: 'Weak', PlayTennis: 'Yes' },
    { id: 'D4', Outlook: 'Rain', Temperature: 'Mild', Humidity: 'High', Wind: 'Weak', PlayTennis: 'Yes' },
    { id: 'D5', Outlook: 'Rain', Temperature: 'Cool', Humidity: 'Normal', Wind: 'Weak', PlayTennis: 'Yes' },
    { id: 'D6', Outlook: 'Rain', Temperature: 'Cool', Humidity: 'Normal', Wind: 'Strong', PlayTennis: 'No' },
    { id: 'D7', Outlook: 'Overcast', Temperature: 'Cool', Humidity: 'Normal', Wind: 'Strong', PlayTennis: 'Yes' },
    { id: 'D8', Outlook: 'Sunny', Temperature: 'Mild', Humidity: 'High', Wind: 'Weak', PlayTennis: 'No' },
    { id: 'D9', Outlook: 'Sunny', Temperature: 'Cool', Humidity: 'Normal', Wind: 'Weak', PlayTennis: 'Yes' },
    { id: 'D10', Outlook: 'Rain', Temperature: 'Mild', Humidity: 'Normal', Wind: 'Weak', PlayTennis: 'Yes' },
    { id: 'D11', Outlook: 'Sunny', Temperature: 'Mild', Humidity: 'Normal', Wind: 'Strong', PlayTennis: 'Yes' },
    { id: 'D12', Outlook: 'Overcast', Temperature: 'Mild', Humidity: 'High', Wind: 'Strong', PlayTennis: 'Yes' },
    { id: 'D13', Outlook: 'Overcast', Temperature: 'Hot', Humidity: 'Normal', Wind: 'Weak', PlayTennis: 'Yes' },
    { id: 'D14', Outlook: 'Rain', Temperature: 'Mild', Humidity: 'High', Wind: 'Strong', PlayTennis: 'No' },
  ],
};

/**
 * Restaurant Wait Dataset (Russell & Norvig, Slides 74-89)
 * 12 instances, 6 Yes, 6 No
 */
export const RESTAURANT_DATASET: DatasetDef = {
  id: 'restaurant-wait',
  name: 'Restaurant Waiting Dataset (Russell & Norvig)',
  description: '12 dining scenarios deciding whether customers will wait for a table.',
  targetAttribute: 'WillWait',
  attributes: ['Patrons', 'Hungry', 'Type', 'WaitEstimate'],
  attributeValues: {
    Patrons: ['None', 'Some', 'Full'],
    Hungry: ['Yes', 'No'],
    Type: ['French', 'Italian', 'Thai', 'Burger'],
    WaitEstimate: ['0-10', '10-30', '30-60', '>60'],
  },
  data: [
    { id: 'X1', Patrons: 'Some', Hungry: 'Yes', Type: 'French', WaitEstimate: '0-10', WillWait: 'Yes' },
    { id: 'X2', Patrons: 'Full', Hungry: 'Yes', Type: 'Thai', WaitEstimate: '30-60', WillWait: 'No' },
    { id: 'X3', Patrons: 'Some', Hungry: 'No', Type: 'Burger', WaitEstimate: '0-10', WillWait: 'Yes' },
    { id: 'X4', Patrons: 'Full', Hungry: 'Yes', Type: 'Thai', WaitEstimate: '10-30', WillWait: 'Yes' },
    { id: 'X5', Patrons: 'Full', Hungry: 'No', Type: 'French', WaitEstimate: '>60', WillWait: 'No' },
    { id: 'X6', Patrons: 'Some', Hungry: 'Yes', Type: 'Italian', WaitEstimate: '0-10', WillWait: 'Yes' },
    { id: 'X7', Patrons: 'None', Hungry: 'No', Type: 'Burger', WaitEstimate: '0-10', WillWait: 'No' },
    { id: 'X8', Patrons: 'Some', Hungry: 'Yes', Type: 'Thai', WaitEstimate: '0-10', WillWait: 'Yes' },
    { id: 'X9', Patrons: 'Full', Hungry: 'No', Type: 'Burger', WaitEstimate: '>60', WillWait: 'No' },
    { id: 'X10', Patrons: 'Full', Hungry: 'Yes', Type: 'Italian', WaitEstimate: '10-30', WillWait: 'No' },
    { id: 'X11', Patrons: 'None', Hungry: 'No', Type: 'Thai', WaitEstimate: '0-10', WillWait: 'No' },
    { id: 'X12', Patrons: 'Full', Hungry: 'Yes', Type: 'Burger', WaitEstimate: '30-60', WillWait: 'Yes' },
  ],
};

/**
 * Gym Attendance Dataset (Slides 65-71)
 * 30 instances: 16 Yes, 14 No
 */
export const GYM_DATASET: DatasetDef = {
  id: 'gym-attendance',
  name: 'Gym Attendance Dataset (SNGCE Notes)',
  description: '30 records deciding gym attendance based on Energy level and Motivation.',
  targetAttribute: 'GoToGym',
  attributes: ['Energy', 'Motivation'],
  attributeValues: {
    Energy: ['High', 'Low'],
    Motivation: ['High', 'Neutral', 'None'],
  },
  data: [
    // High Energy (13 Yes, 2 No)
    ...Array.from({ length: 13 }, (_, i) => ({ id: `G${i + 1}`, Energy: 'High', Motivation: i % 2 === 0 ? 'High' : 'Neutral', GoToGym: 'Yes' })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: `G${i + 14}`, Energy: 'High', Motivation: 'None', GoToGym: 'No' })),
    // Low Energy (3 Yes, 12 No)
    ...Array.from({ length: 3 }, (_, i) => ({ id: `G${i + 16}`, Energy: 'Low', Motivation: 'High', GoToGym: 'Yes' })),
    ...Array.from({ length: 12 }, (_, i) => ({ id: `G${i + 19}`, Energy: 'Low', Motivation: i % 2 === 0 ? 'None' : 'Neutral', GoToGym: 'No' })),
  ],
};
