#Nuevo usuario
mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
    }
  }

  {
    "input": {
      "nombre": "German",
      "apellido": "Biagioni",
      "email": "german@gmail.com",
      "password": "123456"
    }
  }

#Autenticar Usuario
mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }

  {
    "input": {
      "email": "florencia.apgrupo@gmail.com",
      "password": "123456"
    }
  }

#Obtener usuario actual
query obtenerUsuario($token: String!){
  obtenerUsuario(token: $token) {
    id
  }
}

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMGQ4OWFmY2E5MTQ5MTUzYzY3NzM0MSIsImVtYWlsIjoibWFybGlAZ21haWwuY29tIiwibm9tYnJlIjoiTWFybGVuIiwiYXBlbGxpZG8iOiJDcnVjZXMiLCJpYXQiOjE1OTQ3MjI3NTMsImV4cCI6MTU5NDgwOTE1M30.RU3-Mo6r1eiomo4MaZunBWG77UGtyPlvA_k55xKC88w"
}



