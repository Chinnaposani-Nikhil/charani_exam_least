// import admin from "firebase-admin";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: "charani-d9e7e",
//       clientEmail: "firebase-adminsdk-fbsvc@charani-d9e7e.iam.gserviceaccount.com",
//       privateKey:  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/b5GtOv37rgb2\nmuw2RrL2MNbY0lmll20YfTQZJhutAO3RJeRW6nROysSs1zU5CEDU8W303ilC+Tl8\nNRELGQSc8meBgtIWXz8z7h9btSnRfkTA/MjOpGgVT571k8CtxhcXbMBvvsp8AsWw\n1NOdRlUr+7SgujKnc3JMur/p4FseegiSQrpJbn/A/kR6CWWnTW8Q793k1wxaxtYz\ngaCjfM289mvU4TdU1pQj6SHvz4LjNBVjT5IE53luJvuGpInWJ+BrusNrWv+XZ8+u\nlFm4O+MVr2bwdkLYQ1T3VWvdRNmN/EP9SHv2WrwgMdT3tdbwQihGiQqEx31SlIz+\nc+/iXDuvAgMBAAECggEADvIKaQBUiNwezgztSRV+7kqE03ukpRFr4oAP27DGc1zB\ntFTlfUWjm+0nqqjIjnHPAfDxWS8pAIINk11fPcMPwaMJIqrQdQ+tkwPRreq4X5Mg\nkgKKONvMBnHnYpvM7KQs9Fa4tWCrVUAwJ+yNstclWiA2C2BOCRWxxDzGM9+grYHN\n7QWO8GcQjkDcuzLTStV0oEr4O5KQ9/Rin8Eu6iQeoBUZEJubXQ2oqoDEVCSMnTFf\n7czU7Q2TMACk06nsikwiWriMrwyvLi5t5MJDDtODzaAwrDZtI8RvwSXQWX6FTS0I\n18gbJfyzZoMJiu1l81uA7aIRu79P3o4/0TFHVt0K5QKBgQDfrtLLjf1kNOLKkHNV\n/iYquiEtnb3TCXCXGz7ybJF7nrIBl4uhnpxJ2dyLvC9S/ND5sZ2vIhDsXHRefEwI\n/XG1BMiYip9bOiQdtJu1ZaumuIJeX/jqoRDWX/JqGxxeJWTocoJRRfATbTFuzE8E\njuvXgUpFc4xorQrf5ps8PoZhYwKBgQDbGAyKpAaP1fyn6nV9RxlVnQz0cnz9c2R6\nLZwVSzTVLDcy12fy5Huy7X0/RZGwecnY6iuiGPmc7RTDmfTTMRaaVdBmMD5x6VrO\nqWIl7oQyMzKSg3nMr4Ar59acbHsmFyTNp38L8D4owEnr8BBk0Up+Pqc/dcwZVNoJ\nlZPgyerURQKBgQCV6MKZbVXPHKqJ+3lwvl2x8QBfZAJeN0tf2gC71AtEgDzoWDpa\nXMR9sibe94X35jvfvCvjvb79yZCr6j3DIKheGxCdOvpF15dw2SQp1DPQDoRA360h\nAkUYh0Ed34GJjyIrruKruWWGf33Ltd2XPnnM+ndeSGxnkuFg4VpUa8r/5QKBgQDE\nsuSfm/9gJ0e8IVz16l0uZd95n0fj7DNrFYOqAmkecaHk/UsP4F3GGD14Dqdr/wte\nuW4PC8keQCOCMLiC2vFmAmElPW7yqgSiwaOiVm9M+nYO4Ab74xx5Tp14tlQhsGmU\nUSpYt4m24Fv9fPva56Ovj+RrrwBcRbezHx0ylVVE2QKBgCsdmDzOEaMmKcC1bx0k\niNnfDKETOi5lTNdZIFJF6Ld5pp+vmW1hsezM/Ct95msrdZLzbwWvnFnDHuUGk9Gp\nCPFF+JrtzCObYBp9DmGvwGq09xf+/mSm812vmnASRi63QivkNqFuEsUz36m/xU82\nBJ6BZ/UKFPIy6GPbPP0UFQI/\n-----END PRIVATE KEY-----\n",
//     }),
//     databaseURL: "https://charani-d9e7e-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   });
// }

// export const db = admin.database();


import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "charani-online-test-db",
      clientEmail: "firebase-adminsdk-fbsvc@charani-online-test-db.iam.gserviceaccount.com",
      privateKey:  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDmK1jteEuvxLT1\nxRDAOgJpN1wwPSJDP6fsYj5IyX/cR8iUsiOKdTsGBo62GkqFSY5EWISqV71R22Ol\nqRvCCkLnBJ8uuNpFPhSgiiO49XmDmFTOUm49sfK6fCdUiw/kZwkLEPhizG9Zk6LX\nBJK4Znq5cFd/C0Ya8llJMIYJ8hIsG7ijdPAw7wSo7Avc0RFHGEEjoiUD0yPjTHO/\nugVMbA96JUJfz8N7SF+2hgsWyULCdjrPwgV+4XfZVcJtAoEWH4Xq69bGbyRMSr8Z\nBe+4HceIDq7oHQ+Ca3uPfEjQ3my6PdwnG92QwXz1pzQwpsTNn0iPec6r9pIRX4pc\npRRRr1LbAgMBAAECggEADmC0euJcqVD6ftm9sfb4XJXf39w0bjVP6jUO2qF0/Q/M\n3fZXawLnWiPXDqq2Gf0Ix93XAlmzEqXHjpBxkp2Xz/IwIWKHBp6Z+kH2zksjOTmu\n89PJXXg8BzMnNSGaBLSnp3XQFkKFTXf/9Y+BvMbGBscXksY5AwjoKT7AjhF9hMdj\niFWffngFOTmXQKPN/ibiXi77KVwt6q8l4qqHfrkUXbDPaDx98xJHX4X+3Z9Vfh6q\nKDkwfxcwb9gTDALh6XbMGduVoOxtamSpmTvT1kae9pxen5zMuzucVa/HXd6VoLh+\n15V0eW9ndCkd11yJaX/38U0BCJyZ8xklbbgSPW5HyQKBgQD0QXhqr3lHlgYJy9do\nuuQqZHx1Q+5+pF9I3z+SGh1dXR6brfDWv/n8aIkFoyx8C+Vlccd5UJEcIoy7P6J2\nsbNmBwJ8n9x1aboOgrAPHF+sY/7IBz4qTeS5TryYNEBxxC22oD4+XbbxXY3/Q5oU\n6J9sXH1/B0rdNqZbfMa1KicTAwKBgQDxPHz0Tv6sihEdmQMqYSWPIQgGNiSJeAPc\n1jfCQPon6KdoO1XR2/x+b35TZvKIfDZqBpEqZJdnj9uTbv9j3akxyTAZSFOw7bZI\neeXgT2HFehY5UadlhWGReA1c8ZTvHOjEhctjzMFOHrz7EuZuVjPEJhYVyFEKQxhz\nWKFk4vFNSQKBgQChjNPqLBkZAd8Ih6v3dvUGHOQ8YyvQ00K6Xf4b0e3uHHLsIMWU\nI/FhwnouIlh/yxZ0XCbE1EbFxwwxpMr9mla/eo9oggs8FSucAVAVDn0w9gpDnpa9\nQDuxXKRcPuMI2+ooSiAg+7bOOUR7uuikP5+B+kJ+zAH2AflRtVtv42topQKBgQDZ\npTE3Wm37TTXT9lEc0zkHwU10DTU5scYKYFs+L1GC4CzppV7wUAGmMQFQTflTmn2d\nev9NuCPBk9EPW32fpEUaXeG/bbnUTyO+j/wOPJCBknyqijj1Jzm3/RBRYsR0VyjK\n5cty5zEgQitOeubbdXqO5a3XSTuUfqR4rOYwF3CNwQKBgE6QsNHblJx0gvBMYdU3\n71OshMhhrlJuLRus9gwfWRWh9/duTTgaWvTg6a+1sUcHhkcxrY7asDMckSMXii/D\nSDy9uV1HgPnIHrslebxDSwPwA+KaQi+zXo7kvgmf2yIPaL/KOwFA1ZAHdZCUbphb\n63icYLpbClSQJXwyvFCeMIBq\n-----END PRIVATE KEY-----\n",
    }),
    databaseURL: "https://charani-online-test-db-default-rtdb.firebaseio.com/",
  });
}

export const db = admin.database();