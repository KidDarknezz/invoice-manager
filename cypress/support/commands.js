// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: 'AIzaSyCmhqOfz2yaOmz6lEbp0bE1cuyFu2xlgSo',
    authDomain: 'invoice-manager-6e5f5.firebaseapp.com',
    projectId: 'invoice-manager-6e5f5',
    storageBucket: 'invoice-manager-6e5f5.appspot.com',
    messagingSenderId: '1073198062429',
    appId: '1:1073198062429:web:45c3cb7a5d89062b9226b4',
    measurementId: 'G-3WGPTS0RDW',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
