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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import {attachCustomCommands} from 'cypress-firebase'

const fbConfig = {
    apiKey: 'AIzaSyCmhqOfz2yaOmz6lEbp0bE1cuyFu2xlgSo',
    authDomain: 'invoice-manager-6e5f5.firebaseapp.com',
    projectId: 'invoice-manager-6e5f5',
    storageBucket: 'invoice-manager-6e5f5.appspot.com',
    messagingSenderId: '1073198062429',
    appId: '1:1073198062429:web:45c3cb7a5d89062b9226b4',
    measurementId: 'G-3WGPTS0RDW',
}

firebase.initializeApp(fbConfig)
firebase.auth().useEmulator('http://localhost:9099/')
firebase.firestore().useEmulator('localhost', 8081)

Cypress.Commands.add('populateUsers', async () => {
    const users = [
        //Admins
        {
            uid: 'IJS9L5gF2wfzUZ0eFq7AOHChXHl1',
            email: 'alejandro@blueballoon.io',
            password: 'BlueBalloon123!',
            emailVerified: true,
        },
        {
            uid: '1foD4w5ODOOi8sTVkmaATxxIDIP2',
            email: 'diego@blueballoon.io',
            password: 'BlueBalloon123!',
            emailVerified: true,
        },
        {
            uid: 'kJSROjSWgff38eDmZKg23yhgXpW2',
            email: 'rpinto@rm-servicios.com',
            password: 'BlueBalloon123!',
            emailVerified: true,
        },
    ]
    console.log(firebase.auth())
})
attachCustomCommands({Cypress, cy, firebase})
