import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAFvgbIJr8WdaG4tNcS7iD1AOHval2Ub14",
  authDomain: "banto-test-7f19b.firebaseapp.com",
  databaseURL: "https://banto-test-7f19b.firebaseio.com",
  projectId: "banto-test-7f19b",
  storageBucket: "banto-test-7f19b.appspot.com",
  messagingSenderId: "721720877036",
  appId: "1:721720877036:web:57ae4b3c0ce95175052ac9",
  measurementId: "G-GSTD5Q301S"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

const google_provider = new firebase.auth.GoogleAuthProvider();
const fb_provider = new firebase.auth.FacebookAuthProvider();
const twitter_provider = new firebase.auth.TwitterAuthProvider();
const github_provider = new firebase.auth.GithubAuthProvider();

export { google_provider, fb_provider, twitter_provider, github_provider };
