------------------ Icke inloggad användare -------------
[X].En icke-inloggad användare ska inte kunna göra något annat än att registrera sig och logga in.
[X].Lösenord ska vara minst 8 tecken långa och innehålla minst en stor bokstav, samt minst ett tecken som inte är någon bokstav. Detta ska kontrolleras både på frontend och på backend. (Notera även: Vid registrering ska användare ange lösenord 2 gånger och dessa ska matcha innan man får registrera sig.)

------------------Användare --------------------------
[].En inloggad användare ska kunna: Se andra användare sorterade i namnordning och söka/filtrera bland dessa
[].Skapa/påbörja en ny chat (med ämnesrubrik) och bjuda in andra användare till den.
[].Se vilka chattar hen har blivit inbjuden till och välja att gå med i dessa.
[].Se en lista över sina chattar, både de hen själv skapat och de hen gått med i efter inbjudan, och välja hur listan sorteras (efter ämnesrubrik, efter när hen själv skrev i den sist samt efter när någon skrev i den sist).
[X].Skriva meddelanden i en chat och i ‘realtid’ se meddelanden andra skriver i den.
[].Se om en administratör har stängt av dig från en chatt.
[].“Blocka”/ta bort användare från en chat hen skapat/påbörjat.

------------------- Administratör --------------------
[].Se alla chattar och deras innehåll
[].Ta bort enskilda chat-meddelande i valfri chat
[].Skriva meddelanden/kommentarer i valfri chat och då ska de tydligt synas att dessa kommer från en admin.
[].Blocka/stänga av valfri användare i valfri chat

--------------------- Chatten---------------------------
[X].Chattars ämnesrubrik och chatmeddelanden ska sparas i en databas. När man går med i en chat ska man kunna se chathistoriken.
[X].Användargränssnittet ska vara lättförståeligt och responsivt. (Bygg det gärna “mobile first” om du inte skulle hinna med anpassning till större skärmar. Det ska fungera på mobil!)

--------------------- Tekniska krav ---------------------------

[X].Använda ett frontendramverk (välj mellan React, Vue, Angular eller Svelte) och en utvecklingsserver/byggsystem (t.ex. Vite(CRA etc) .Välj gärna ett ramverk du redan kan, om du inte vill lägga extra tid på att lära dig ett nytt.

[X].Välj backendspråk och ev. ramverk (t.ex. Node.js med Express, Java Spring, PHP etc). Valet är ditt, men välj gärna något du rredan kan, om du inte vill lägga extra tid på att lära dig något nytt.

[X].Välj en databas. (T.ex. SQLite, MySQL, MariaDB, Postgres SQL, MongoDB). Som med övriga teknikval: Om du inte vill lägga tid på att lära dig något nytt, välj något du redan kan en del om.

[].Skapa en REST-backend som har ACL-skydd så att routes bara kan nås av användare med rätt behörighet/användarroller. Använd whitelisting som princip.

[X].Skapa ett eget registrerings- och inlogningssystem. Cookies kopplade till sessioner ska användas. Sessioner ska sparas i databasen och systemet ska klara en omstart utan att inloggade användare slängs ut.

[X].Implementera antingen SSE eller websockets för att kunna “pusha” meddelanden från servern till klienten så att de syns direkt. (SSE rekommenderas i första hand då detta är enklare, energisnålare samt mer snarlikt REST, men du väljer). Vi kommer att gå igenom/ha en föreläsning om hur SSE fungerar.

[X].Skapa ett GitHub-repository för din kod. Gör frekventa commits med bra rubriker/beskrivningar till ditt GitRepository.

[X].Använd inte CORS för att kunna köra utvecklingsserver och backend med REST-api parallelt. Använd ditt utvecklings/bygg-verktygs möjlighet att proxy:a trafiken vidare till din backend.

[X].Användargränssnittet ska vara skapat med med hjälp av ett CSS-bibliotek (t.ex. Bootstrap, Materialize eller TailWind).
