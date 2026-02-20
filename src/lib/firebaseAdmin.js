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
      projectId: "charani-online-exam",
      clientEmail: "firebase-adminsdk-fbsvc@charani-online-exam.iam.gserviceaccount.com",
      privateKey:  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtDXgoEDVxk8Ex\n9akVGhAUfUBGZNqhnEtzywepKQ9SHuUoNeXz1Ms+l1VvkoWo5exC9LUz6HsEuvkp\n+rtLO8a/uq4YdnVltP17B8J9H5affUMdaMz659zZbVL22Oqkyrf3HW9r6LBlfv0C\nicL/Ig6qJN/TMKn/S2EgLJWvfNbMgfXfMpZ2si53Zi5XQPFFh31Pot9JUe+E5GkK\ncHXhpybvp+yRXhi63gXWbFYfGwmMlYXuYx9U4OHB07WW5c1iuKUSxNoHR280KDDk\nLr00zlUlN5nTVhZpcMUnTb7BTdTf9+XVYLyldlDAd5vees/uG1T5sU0J25uyNpt/\nz9t/+T5xAgMBAAECggEAAYOUXaWp9KI8QSaaN4DoSCHO16k3/xljHcDQD1UlSqF4\nsKVhxQ3zbU4lT739QrFuw7vyQySb1J2NMrmvgAVjP1ZXzpp1Ag1luSwjy2TE3gS3\nKx0v65suuJczH+12rMRvHGrjpV+sxEzA7ZZE4e1DY4GOtMru4zWOp8Mq5NUoaBOW\n28KbpLuKX/qT9wswTmW+fkLubVYbV7Hn1AdcT/0NpiI1NqLtR79ZxC+aEapq7Sk0\nUrPZ5+rFUZRr6DJ5MhlBlCC6yQcIkr98+7UhsgorGTR5BuUzxVgyEGat65zk7xmY\nCkAF9ZIvmnleaNxcj9jBCfitIRk7l0pLQ2kPta4rgQKBgQDcwrXsmzSv+QelsUU6\nWAhQSAfeWCICNhf7tJC+r9UYJHjQ/6cahsm3S9ftblzoL84wYaoZBC/JZemPLt0F\nvJGBYZDWRp3SWte/DY9d2dZr7jd1bvmj60gGHXKEh6MF1tjvY24NxNODN2wr0YvF\nFjLTUO85jRjHzbX1Yfz0sMkAgQKBgQDIrTE4080OGo4tSXxgPhUQ/7bHyJ04WzHt\nDhVde/bSEko3ankHlHquN/5UpXmMLXy/8Hf9YgJbXwcYD2dgmFmXdnbA2UAI1E72\ngNb+FAVOLB0OCBei1Q+WnbKFONzSjeZefDvNezOOCNebjDOYn0wnCG2lDz47Ek1h\nFO7qVx1F8QKBgE+yy9L7xW2yThx3fzKtDXNOTejrkHuT49yvN4JgIGJy6FsrsLxW\n5QQTkYTaTxhUCfBVkf8uD8J51HQoywqDJVS8UHnLTLbgrPsAfj23oz2b5tGymtWe\n34W1o95MyYIWKoNiNh0qbeH1ZEv9fqRMe1Tm5zazxbp8fbB1C8ma+TYBAoGBAMWl\n7yjtUrVlaksoaZvRCaaodTnoWRE8oLu+d0SP59WXtglGkNXqY7pb498y67goxQm2\nqjeh5Hhh6/bClSsKYpNPVj8yumL32J3o39d3mJIZ2LQNPFpgRu4te7rC+ptWr2K4\nMZ58jZaDFvhY6iiUHMkFABjmHoDH0fagS3/7NRXBAoGBAJV75wAj4tgfRGnZ7OWO\nu2Qs8p9V3rjKTe3l3nwHzPflP+F1NJjJ0AX8DfMjuuD/i6GzPrcmsTN/Isoyb7+L\nedtOPQv4xyfFOkewp9lJH7v0xqKSN0n4YwYwWpBlqckQDv5pmU3p7uaZbSGQ0vic\nWmWjwg7XtV79q2g9u0TKlOFJ\n-----END PRIVATE KEY-----\n",
    }),
    databaseURL: "https://charani-online-exam-default-rtdb.firebaseio.com/",
  });
}

export const db = admin.database();