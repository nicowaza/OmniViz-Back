const LocalStrategy   = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
import connection from '../helpers/db.connexion';

// expose this function to our app using module.exports
export default function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session



    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use(
    //     'local-signup',
    //     new LocalStrategy({
    //         // by default, local strategy uses username and password, we will override with email
    //         usernameField : 'email',
    //         passwordField : 'password',
    //         passReqToCallback : true // allows us to pass back the entire request to the callback
    //     },
    //     function(req, email, password, done) {
    //         // find a user whose email is the same as the forms email
    //         // we are checking to see if the user trying to register already exists
    //         connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, result, fields) {
    //             if (err)
    //                 return done(err);
    //             if (result.length > 0) {
    //                 console.log('email already in use')
    //                 return done(null, false, req.flash('signupMessage', 'Email is already in use.'));
    //             } else {
    //                 // if there is no user with that email
    //                 // create the user
    //                 var newUserMysql = {
    //                     username: email,
    //                     password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
    //                 };

    //                 var insertQuery = "INSERT INTO users ( email, password ) values (?,?)";

    //                 connection.query(insertQuery,[newUserMysql.email, newUserMysql.password],function(err, rows) {
    //                     newUserMysql.id = rows.insertId;

    //                     return done(null, newUserMysql);
    //                 });
    //             }
    //         });
    //     })
    // );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use(new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, results, fields, user){
                if (err)
                    return done(err);
                if (results.length === 0) {
                    // console.log('no user found');
                    // res.send('no user found')
                    return done(null, false, { message : 'no user found' });
                } else {
                    let hashedPassword = results[0].password;
                    // if the user is found but the password is wrong
                    bcrypt.compare(password, hashedPassword, function(err, response){
                        if(response){
                            // all is well, return successful user
                            const user = results[0]
                            console.log('user :', user)
                            // res.send({status: 200, user: user})
                            return done(null, user, { message : 'user identified'});
                        } else {
                                console.log('wrong password')
                                // res.send({status: 403, errors: 'wrong password'})
                                return done(null, false, { message: 'incorrect password'}); // create the loginMessage and save it to session as flashdata
                            }
                        // if(err) {
                        //     console.log(err);
                        //     return done(null, false, {err: err});
                        // } else if(response) {
                        //     const user = results[0];
                        //     console.log('identified user', user);
                        //     return done(null, user);
                        //     }
                        });
                    }
                })
            }
        )
    )

    passport.serializeUser(function(user, done) {
        console.log('serialize usr_id: ', user.userID)

        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {

        const id = user.userID
        console.log('deserialize usr id: ', id)
        connection.query("SELECT * FROM users WHERE userID = ? ",[id], function(err, user){
            done(null, user);
            // console.log('user : ', user)
        });
    });
};