# JWT Auth Demo

### API based on Spring Security JWT

I use **openssl** which is installed by default on MacOS, but you should be able to get it whatever operating system you're running.

First, we need to generate RSA token:
```
openssl genrsa -out keypair.pem 2048
```
So, we generated RSA private key (keypair.pem). Then, from the private key we can extract the public key:
```
openssl rsa -in keypair.pem -pubout -out public.pem
```
Then, the private key needs to be in a pm encoded **pkcs8** format, otherwise we would end up getting an error in our application.
Let's make sure that we have private key in that format:
```
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem
```
Then we have an ability to get rid keypair.pem, because we aready have proper private and public keys.

Last step, we need to inform our application about the keys, by adding properties in our application.properties:
```
rsa.private-key=classpath:certs/private.pem
rsa.public-key=classpath:certs/public.pem
```

Now, we have secured Spring Boot REST APIs using JSON Web Tokens (JWT).

![](images/jwt.drawio.png)


