/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloFenix = onRequest((request, response) => {
  logger.info("We are Fénix!", {structuredData: true});
  response.send("We are Fénix!");
});

interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; // Assuming YYYY-MM-DD format
  gender: string;
  address: string;
  country: string;
  phone_number: string;
}

interface Report {
  report_date: string;
  candidates_count: number;
  age_avg: number;
}

export const testCandidateReport = onRequest(async (request, response) => {
  logger.info("Generating and logging candidate report with local data...", { structuredData: true });

  // Sample candidate data
  const candidates: Candidate[] = [
    {
      id: "1",
      first_name: "Alice",
      last_name: "Smith",
      date_of_birth: "1990-05-15",
      gender: "Female",
      address: "123 Main St",
      country: "USA",
      phone_number: "123-456-7890",
    },
    {
      id: "2",
      first_name: "Bob",
      last_name: "Johnson",
      date_of_birth: "1985-11-20",
      gender: "Male",
      address: "456 Oak Ave",
      country: "Canada",
      phone_number: "987-654-3210",
    },
    {
      id: "3",
      first_name: "Charlie",
      last_name: "Brown",
      date_of_birth: "2002-03-01",
      gender: "Male",
      address: "789 Pine Ln",
      country: "UK",
      phone_number: "111-222-3333",
    },
    {
      id: "4",
      first_name: "Diana",
      last_name: "Garcia",
      date_of_birth: "1998-09-10",
      gender: "Female",
      address: "101 Elm Rd",
      country: "Spain",
      phone_number: "444-555-6666",
    },
  ];

  const candidatesCount = candidates.length;
  let totalAge = 0;

  if (candidatesCount > 0) {
    candidates.forEach(candidate => {
      const birthDate = new Date(candidate.date_of_birth);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const monthDiff = now.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
        age--;
      }
      totalAge += age;
    });
  }

  const averageAge = candidatesCount > 0 ? totalAge / candidatesCount : 0;
  const reportDate = new Date().toISOString();

  const reportData: Report = {
    report_date: reportDate,
    candidates_count: candidatesCount,
    age_avg: averageAge,
  };

  logger.info("Candidate Report:", JSON.stringify(reportData));
  response.status(200).send("Candidate report generated and logged successfully with local data. "+ JSON.stringify(reportData));
});