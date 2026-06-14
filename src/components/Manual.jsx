import React from 'react';

/**
 * Learning Manual / Study Guide component.
 * Displays the complete formatted user manual on a single scrollable page
 * with smooth anchor link jump buttons.
 * @param {function} onBack - Callback to return to Home view
 */
export default function Manual({ onBack }) {
  
  // Custom scrolling function to scroll inside the content box
  const scrollToSection = (id) => {
    const container = document.getElementById('manual-content-box');
    const target = document.getElementById(id);
    if (container && target) {
      container.scrollTo({
        top: target.offsetTop - container.offsetTop - 10,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="card" style={{ animationDelay: '0.1s', display: 'flex', flexDirection: 'column', maxHeight: '85vh', overflow: 'hidden' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px dashed var(--border-element)', paddingBottom: '0.75rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📖</span> Study Guide / Guide d'étude
        </h2>
        <button onClick={onBack} className="btn btn-secondary" style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
          🏠 Back / Retour
        </button>
      </div>

      {/* Pill-shaped Jump Navigation (Wrap-around layout for responsiveness) */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '0.45rem', 
        marginBottom: '1.25rem',
        borderBottom: '1px solid var(--border-element)',
        paddingBottom: '1rem'
      }}>
        <button onClick={() => scrollToSection('strategy')} className="manual-nav-btn">
          Strategy & Grammar
        </button>
        <button onClick={() => scrollToSection('top100')} className="manual-nav-btn">
          Top 100 Words
        </button>
        <button onClick={() => scrollToSection('words200')} className="manual-nav-btn">
          Words 101-200
        </button>
        <button onClick={() => scrollToSection('words600')} className="manual-nav-btn">
          Words 201-600
        </button>
        <button onClick={() => scrollToSection('pillars')} className="manual-nav-btn">
          Structural Pillars
        </button>
      </div>

      {/* Main Content Box (Single continuous scrollable container) */}
      <div 
        id="manual-content-box"
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          paddingRight: '0.5rem',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}
      >
        {/* SECTION 1: STRATEGY & GRAMMAR */}
        <div id="strategy" style={{ paddingBottom: '2.5rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>1. French Language Overview / Présentation générale</h3>
          <p style={{ marginBottom: '1rem' }}>
            French is a Romance language with:
          </p>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
            <li><strong>Alphabet:</strong> 26 letters (same as English) + accents (é, è, ê, ç, etc.)</li>
            <li><strong>Grammar Highlights:</strong> Gendered nouns (masculine/feminine); articles change with gender and number (un/une, le/la, les); verb conjugations are essential (être, avoir, aller, faire).</li>
            <li><strong>Pronunciation:</strong> Silent letters, nasal vowels, and liaisons are tricky initially. Focus on listening and speaking early.</li>
          </ul>

          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>2. Frequency-Based Word Learning / Apprentissage par fréquence</h3>
          <p style={{ marginBottom: '1rem' }}>
            Statistically, learning words based on frequency provides high conversational coverage:
          </p>
          <table className="manual-table">
            <thead>
              <tr>
                <th>Rank / Rang</th>
                <th>Words Known / Mots</th>
                <th>Coverage / Couverture</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100</td>
                <td>100</td>
                <td>~50% of basic conversation</td>
              </tr>
              <tr>
                <td>600</td>
                <td>600</td>
                <td>~70% of daily conversation</td>
              </tr>
              <tr>
                <td>1000</td>
                <td>1000</td>
                <td>~85% of daily conversation</td>
              </tr>
              <tr>
                <td>3000</td>
                <td>3000</td>
                <td>~95% of daily communication</td>
              </tr>
              <tr>
                <td>6000+</td>
                <td>6000+</td>
                <td>~99%+ (news, novels, fluency)</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>3. Essential Grammar Focus / Grammaire essentielle</h3>
          <p style={{ marginBottom: '0.75rem' }}>Focus on these structural pillars early:</p>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
            <li><strong>Nouns & Articles:</strong> Nouns are gendered. Articles change: <em>le</em> (masc. singular), <em>la</em> (fem. singular), <em>les</em> (plural). E.g., <em>le livre</em> (the book), <em>la maison</em> (the house).</li>
            <li><strong>Pronouns:</strong> <em>je</em> (I), <em>tu</em> (you), <em>il/elle</em> (he/she), <em>nous</em> (we), <em>vous</em> (you plural/formal), <em>ils/elles</em> (they).</li>
            <li><strong>Key Verbs:</strong> <em>être</em> (to be), <em>avoir</em> (to have), <em>aller</em> (to go), <em>faire</em> (to do/make).</li>
            <li><strong>Connectors:</strong> <em>à</em> (to/at), <em>de</em> (of/from), <em>avec</em> (with), <em>pour</em> (for), <em>mais</em> (but), <em>et</em> (and).</li>
          </ul>

          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>4. Practical Learning Tips / Conseils pratiques</h3>
          <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.5rem' }}>
            <li><strong>Chunking:</strong> Memorize 10–15 words per day using flashcards.</li>
            <li><strong>Contextual Learning:</strong> Learn words in blocks. E.g., <em>Où est... ?</em> (Where is... ?).</li>
            <li><strong>Active Listening:</strong> Repeat out loud after checking translations to build muscle memory.</li>
          </ul>
        </div>

        {/* SECTION 2: TOP 100 STARTER WORDS */}
        <div id="top100" style={{ paddingBottom: '2.5rem', borderTop: '1px dashed var(--border-element)', paddingTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>Starter List: Top 100 French Words / Liste de départ : Top 100 Mots</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
            These 100 starter words cover ~50% of basic greetings, questions, and simple structural phrases.
          </p>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1rem' }}>1. Pronouns / Pronoms (14 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>je</td><td>I</td><td>Je parle français. (I speak French.)</td></tr>
              <tr><td>tu</td><td>you (informal)</td><td>Tu es mon ami. (You are my friend.)</td></tr>
              <tr><td>il</td><td>he</td><td>Il aime le café. (He likes coffee.)</td></tr>
              <tr><td>elle</td><td>she</td><td>Elle va à l'école. (She goes to school.)</td></tr>
              <tr><td>nous</td><td>we</td><td>Nous sommes contents. (We are happy.)</td></tr>
              <tr><td>vous</td><td>you (formal/plural)</td><td>Vous êtes gentil. (You are kind.)</td></tr>
              <tr><td>ils</td><td>they (masc/mixed)</td><td>Ils jouent au football. (They play football.)</td></tr>
              <tr><td>elles</td><td>they (feminine)</td><td>Elles sont belles. (They are beautiful.)</td></tr>
              <tr><td>me</td><td>me/myself</td><td>Il me parle. (He speaks to me.)</td></tr>
              <tr><td>te</td><td>you/yourself</td><td>Je te vois. (I see you.)</td></tr>
              <tr><td>se</td><td>himself/herself</td><td>Il se lave. (He washes himself.)</td></tr>
              <tr><td>moi</td><td>me</td><td>C'est pour moi. (It's for me.)</td></tr>
              <tr><td>toi</td><td>you</td><td>C'est pour toi. (It's for you.)</td></tr>
              <tr><td>on</td><td>one/we/people</td><td>On parle français ici. (We speak French here.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>2. Articles (5 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>le</td><td>the (masculine)</td><td>le livre (the book)</td></tr>
              <tr><td>la</td><td>the (feminine)</td><td>la maison (the house)</td></tr>
              <tr><td>les</td><td>the (plural)</td><td>les enfants (the children)</td></tr>
              <tr><td>un</td><td>a/an (masculine)</td><td>un chat (a cat)</td></tr>
              <tr><td>une</td><td>a/an (feminine)</td><td>une pomme (an apple)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>3. Basic Verbs / Verbes de base (20 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>être</td><td>to be</td><td>Je suis étudiant. (I am a student.)</td></tr>
              <tr><td>avoir</td><td>to have</td><td>J'ai un chien. (I have a dog.)</td></tr>
              <tr><td>aller</td><td>to go</td><td>Je vais au parc. (I go to the park.)</td></tr>
              <tr><td>faire</td><td>to do/make</td><td>Je fais mes devoirs. (I do my homework.)</td></tr>
              <tr><td>venir</td><td>to come</td><td>Je viens de Paris. (I come from Paris.)</td></tr>
              <tr><td>dire</td><td>to say</td><td>Il dit bonjour. (He says hello.)</td></tr>
              <tr><td>pouvoir</td><td>can/to be able to</td><td>Je peux nager. (I can swim.)</td></tr>
              <tr><td>vouloir</td><td>to want</td><td>Je veux manger. (I want to eat.)</td></tr>
              <tr><td>savoir</td><td>to know (facts)</td><td>Je sais la réponse. (I know the answer.)</td></tr>
              <tr><td>voir</td><td>to see</td><td>Je vois la mer. (I see the sea.)</td></tr>
              <tr><td>prendre</td><td>to take</td><td>Je prends le bus. (I take the bus.)</td></tr>
              <tr><td>mettre</td><td>to put</td><td>Je mets la tasse sur la table. (I put the cup on the table.)</td></tr>
              <tr><td>donner</td><td>to give</td><td>Je donne un cadeau. (I give a gift.)</td></tr>
              <tr><td>aimer</td><td>to like/love</td><td>J'aime le chocolat. (I like chocolate.)</td></tr>
              <tr><td>parler</td><td>to speak</td><td>Je parle anglais. (I speak English.)</td></tr>
              <tr><td>trouver</td><td>to find</td><td>Je trouve mes clés. (I find my keys.)</td></tr>
              <tr><td>comprendre</td><td>to understand</td><td>Je comprends. (I understand.)</td></tr>
              <tr><td>devoir</td><td>must/to have to</td><td>Je dois partir. (I must leave.)</td></tr>
              <tr><td>passer</td><td>to pass/spend</td><td>Je passe du temps ici. (I spend time here.)</td></tr>
              <tr><td>rester</td><td>to stay</td><td>Je reste à la maison. (I stay at home.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>4. Nouns / Noms (20 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>homme</td><td>man</td><td>L'homme est grand. (The man is tall.)</td></tr>
              <tr><td>femme</td><td>woman</td><td>La femme travaille. (La femme travaille.)</td></tr>
              <tr><td>enfant</td><td>child</td><td>L'enfant joue. (The child plays.)</td></tr>
              <tr><td>temps</td><td>time/weather</td><td>Le temps est beau. (The weather is nice.)</td></tr>
              <tr><td>jour</td><td>day</td><td>Bonne journée! (Have a good day!)</td></tr>
              <tr><td>chose</td><td>thing</td><td>C'est une bonne chose. (It's a good thing.)</td></tr>
              <tr><td>monde</td><td>world</td><td>Le monde est grand. (The world is big.)</td></tr>
              <tr><td>maison</td><td>house</td><td>J'ai une maison. (I have a house.)</td></tr>
              <tr><td>école</td><td>school</td><td>Je vais à l'école. (I go to school.)</td></tr>
              <tr><td>travail</td><td>work/job</td><td>J'aime mon travail. (I like my job.)</td></tr>
              <tr><td>main</td><td>hand</td><td>Je lève la main. (I raise my hand.)</td></tr>
              <tr><td>yeux</td><td>eyes</td><td>Elle a les yeux bleus. (She has blue eyes.)</td></tr>
              <tr><td>ami</td><td>friend (masc.)</td><td>C'est mon ami. (He's my friend.)</td></tr>
              <tr><td>amie</td><td>friend (fem.)</td><td>C'est mon amie. (She's my friend.)</td></tr>
              <tr><td>famille</td><td>family</td><td>Ma famille est grande. (My family is big.)</td></tr>
              <tr><td>nom</td><td>name</td><td>Quel est ton nom? (What is your name?)</td></tr>
              <tr><td>ville</td><td>city</td><td>Paris est une belle ville. (Paris is a beautiful city.)</td></tr>
              <tr><td>eau</td><td>water</td><td>Je bois de l'eau. (I drink water.)</td></tr>
              <tr><td>nourriture</td><td>food</td><td>La nourriture est bonne. (The food is good.)</td></tr>
              <tr><td>argent</td><td>money</td><td>J'ai besoin d'argent. (I need money.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>5. Adjectives / Adjectifs (10 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>grand</td><td>big/tall</td><td>Un grand homme. (A tall man.)</td></tr>
              <tr><td>petit</td><td>small/short</td><td>Un petit chien. (A small dog.)</td></tr>
              <tr><td>bon</td><td>good</td><td>C'est bon! (It's good!)</td></tr>
              <tr><td>mauvais</td><td>bad</td><td>C'est mauvais. (It's bad.)</td></tr>
              <tr><td>nouveau</td><td>new</td><td>Un nouveau livre. (A new book.)</td></tr>
              <tr><td>vieux</td><td>old</td><td>Un vieux chat. (An old cat.)</td></tr>
              <tr><td>beau</td><td>beautiful</td><td>Un beau tableau. (A beautiful painting.)</td></tr>
              <tr><td>jeune</td><td>young</td><td>Une jeune fille. (A young girl.)</td></tr>
              <tr><td>chaud</td><td>hot</td><td>Il fait chaud. (It's hot.)</td></tr>
              <tr><td>froid</td><td>cold</td><td>Il fait froid. (It's cold.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>6. Prepositions & Conjunctions (15 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>à</td><td>to/at</td><td>Je vais à Paris. (I go to Paris.)</td></tr>
              <tr><td>de</td><td>of/from</td><td>Je viens de France. (I come from France.)</td></tr>
              <tr><td>dans</td><td>in</td><td>Je suis dans la maison. (I am in the house.)</td></tr>
              <tr><td>sur</td><td>on</td><td>Le livre est sur the table. (The book is on the table.)</td></tr>
              <tr><td>sous</td><td>under</td><td>Le chat est sous the table. (The cat is under the table.)</td></tr>
              <tr><td>pour</td><td>for</td><td>C'est pour toi. (It's for you.)</td></tr>
              <tr><td>avec</td><td>with</td><td>Je viens avec mon ami. (I come with my friend.)</td></tr>
              <tr><td>sans</td><td>without</td><td>Je pars sans toi. (I leave without you.)</td></tr>
              <tr><td>mais</td><td>but</td><td>J'aime le café mais pas le thé. (I like coffee but not tea.)</td></tr>
              <tr><td>et</td><td>and</td><td>Le pain et le fromage. (Bread and cheese.)</td></tr>
              <tr><td>ou</td><td>or</td><td>Café ou thé? (Coffee or tea?)</td></tr>
              <tr><td>parce que</td><td>because</td><td>Je reste parce que je suis fatigué. (I stay because I'm tired.)</td></tr>
              <tr><td>quand</td><td>when</td><td>Quand arrives-tu? (When do you arrive?)</td></tr>
              <tr><td>où</td><td>where</td><td>Où es-tu? (Where are you?)</td></tr>
              <tr><td>comme</td><td>like/as</td><td>C'est comme ça. (It's like that.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>7. Expressions (16 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>oui</td><td>yes</td><td>Oui, je comprends. (Yes, I understand.)</td></tr>
              <tr><td>non</td><td>no</td><td>Non, merci. (No, thank you.)</td></tr>
              <tr><td>bonjour</td><td>hello</td><td>Bonjour! Ça va? (Hello! How are you?)</td></tr>
              <tr><td>salut</td><td>hi/bye</td><td>Salut! (Hi!)</td></tr>
              <tr><td>au revoir</td><td>goodbye</td><td>Au revoir! (Goodbye!)</td></tr>
              <tr><td>merci</td><td>thank you</td><td>Merci beaucoup. (Thank you very much.)</td></tr>
              <tr><td>pardon</td><td>sorry</td><td>Pardon, où est la gare? (Excuse me, where is the station?)</td></tr>
              <tr><td>s'il vous plaît</td><td>please</td><td>Un café, s'il vous plaît. (A coffee, please.)</td></tr>
              <tr><td>aujourd'hui</td><td>today</td><td>Aujourd'hui, je travaille. (Today, I work.)</td></tr>
              <tr><td>hier</td><td>yesterday</td><td>Hier, j'étais fatigué. (Yesterday, I was tired.)</td></tr>
              <tr><td>demain</td><td>tomorrow</td><td>Demain, je pars. (Tomorrow, I leave.)</td></tr>
              <tr><td>maintenant</td><td>now</td><td>Je pars maintenant. (I leave now.)</td></tr>
              <tr><td>très</td><td>very</td><td>C'est très bon! (It's very good!)</td></tr>
              <tr><td>beaucoup</td><td>a lot</td><td>Merci beaucoup. (Thank you very much.)</td></tr>
              <tr><td>trop</td><td>too/too much</td><td>C'est trop cher. (It's too expensive.)</td></tr>
              <tr><td>peut-être</td><td>maybe</td><td>Peut-être demain. (Maybe tomorrow.)</td></tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 3: WORDS 101-200 */}
        <div id="words200" style={{ paddingBottom: '2.5rem', borderTop: '1px dashed var(--border-element)', paddingTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>Words 101–200 / Mots 101–200</h3>
          
          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1rem' }}>1. Action & Thought Verbs / Verbes d'action et pensée (25 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>croire</td><td>to believe</td><td>Je crois que oui. (I believe so.)</td></tr>
              <tr><td>demander</td><td>to ask</td><td>Je demande de l'aide. (I ask for help.)</td></tr>
              <tr><td>penser</td><td>to think</td><td>Je pense à toi. (I think of you.)</td></tr>
              <tr><td>laisser</td><td>to leave / let</td><td>Laisse-moi tranquille. (Leave me alone.)</td></tr>
              <tr><td>entendre</td><td>to hear</td><td>J'entends un bruit. (I hear a noise.)</td></tr>
              <tr><td>regarder</td><td>to look at</td><td>Regarde ça! (Look at that!)</td></tr>
              <tr><td>répondre</td><td>to answer</td><td>Elle répond au téléphone. (She answers the phone.)</td></tr>
              <tr><td>rendre</td><td>to return / give back</td><td>Je rends le livre. (I return the book.)</td></tr>
              <tr><td>connaître</td><td>to know (people)</td><td>Je connais cet homme. (I know this man.)</td></tr>
              <tr><td>paraître</td><td>to seem</td><td>Ça paraît difficile. (It seems difficult.)</td></tr>
              <tr><td>arriver</td><td>to arrive / happen</td><td>J'arrive bientôt. (I'm arriving soon.)</td></tr>
              <tr><td>sentir</td><td>to feel / smell</td><td>Ça sent bon. (That smells good.)</td></tr>
              <tr><td>attendre</td><td>to wait</td><td>J'attends le bus. (I'm waiting for the bus.)</td></tr>
              <tr><td>vivre</td><td>to live</td><td>Je vis en France. (I live in France.)</td></tr>
              <tr><td>chercher</td><td>to search / look for</td><td>Je cherche mes clés. (I'm looking for my keys.)</td></tr>
              <tr><td>sortir</td><td>to go out / exit</td><td>Je sors ce soir. (I'm going out tonight.)</td></tr>
              <tr><td>porter</td><td>to wear / carry</td><td>Il porte un manteau. (He is wearing a coat.)</td></tr>
              <tr><td>devenir</td><td>to become</td><td>Il devient médecin. (He becomes a doctor.)</td></tr>
              <tr><td>entrer</td><td>to enter</td><td>Entrez, s'il vous plaît. (Come in, please.)</td></tr>
              <tr><td>écrire</td><td>to write</td><td>J'écris un message. (I'm writing a message.)</td></tr>
              <tr><td>appeler</td><td>to call</td><td>Je t'appelle demain. (I'll call you tomorrow.)</td></tr>
              <tr><td>tomber</td><td>to fall</td><td>Attention à ne pas tomber. (Careful not to fall.)</td></tr>
              <tr><td>commencer</td><td>to start</td><td>Le film commence. (The movie is starting.)</td></tr>
              <tr><td>montrer</td><td>to show</td><td>Montre-moi ça. (Show me that.)</td></tr>
              <tr><td>arrêter</td><td>to stop</td><td>Arrête de parler. (Stop talking.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>2. Everyday Nouns / Noms du quotidien (30 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>voiture</td><td>car</td><td>Ma voiture est rouge. (My car is red.)</td></tr>
              <tr><td>rue</td><td>street</td><td>C'est dans cette rue. (It's on this street.)</td></tr>
              <tr><td>ville</td><td>city</td><td>J'aime cette ville. (I like this city.)</td></tr>
              <tr><td>pays</td><td>country</td><td>C'est un beau pays. (It's a beautiful country.)</td></tr>
              <tr><td>nuit</td><td>night</td><td>Bonne nuit! (Good night!)</td></tr>
              <tr><td>matin</td><td>morning</td><td>Je travaille le matin. (I work in the morning.)</td></tr>
              <tr><td>soir</td><td>evening</td><td>À ce soir! (See you tonight!)</td></tr>
              <tr><td>année</td><td>year</td><td>Bonne année! (Happy New Year.)</td></tr>
              <tr><td>mois</td><td>month</td><td>Le mois prochain. (Next month.)</td></tr>
              <tr><td>semaine</td><td>week</td><td>La semaine dernière. (Last week.)</td></tr>
              <tr><td>heure</td><td>hour / time</td><td>Quelle heure est-il ? (What time is it?)</td></tr>
              <tr><td>problème</td><td>problem</td><td>Pas de problème. (No problem.)</td></tr>
              <tr><td>history</td><td>story / history</td><td>C'est une longue histoire. (It's a long story.)</td></tr>
              <tr><td>amour</td><td>love</td><td>L'amour est aveugle. (Love is blind.)</td></tr>
              <tr><td>raison</td><td>reason</td><td>Tu as raison. (You're right.)</td></tr>
              <tr><td>fille</td><td>girl / daughter</td><td>C'est ma fille. (That's my daughter.)</td></tr>
              <tr><td>garçon</td><td>boy</td><td>Le garçon mange. (The boy is eating.)</td></tr>
              <tr><td>chambre</td><td>bedroom</td><td>Ma chambre est petite. (My bedroom is small.)</td></tr>
              <tr><td>lit</td><td>bed</td><td>Je vais au lit. (I'm going to bed.)</td></tr>
              <tr><td>porte</td><td>door</td><td>Ferme la porte. (Close the door.)</td></tr>
              <tr><td>mot</td><td>word</td><td>Je ne comprends pas ce mot. (I don't understand this word.)</td></tr>
              <tr><td>place</td><td>place / seat</td><td>Prends ma place. (Take my seat.)</td></tr>
              <tr><td>idée</td><td>idea</td><td>Bonne idée! (Good idea!)</td></tr>
              <tr><td>question</td><td>question</td><td>J'ai une question. (I have a question.)</td></tr>
              <tr><td>chemin</td><td>path / way</td><td>C'est le bon chemin. (It's the right way.)</td></tr>
              <tr><td>père</td><td>father</td><td>Mon père est gentil. (My father is kind.)</td></tr>
              <tr><td>mère</td><td>mother</td><td>Ma mère travaille. (My mother works.)</td></tr>
              <tr><td>frère</td><td>brother</td><td>J'ai un frère. (I have a brother.)</td></tr>
              <tr><td>sœur</td><td>sister</td><td>Voici ma sœur. (Here is my sister.)</td></tr>
              <tr><td>bureau</td><td>office / desk</td><td>Je suis au bureau. (I'm at the office.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>3. Descriptive Adjectives / Adjectifs descriptifs (20 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>vrai</td><td>true</td><td>C'est vrai. (That's true.)</td></tr>
              <tr><td>faux</td><td>false / wrong</td><td>C'est faux. (That's wrong.)</td></tr>
              <tr><td>seul</td><td>alone / only</td><td>Je suis seul. (I'm alone.)</td></tr>
              <tr><td>autre</td><td>other</td><td>Une autre fois. (Another time.)</td></tr>
              <tr><td>même</td><td>same</td><td>La même chose. (The same thing.)</td></tr>
              <tr><td>premier</td><td>first</td><td>Le premier jour. (The first day.)</td></tr>
              <tr><td>dernier</td><td>last</td><td>Le dernier train. (The last train.)</td></tr>
              <tr><td>fort</td><td>strong</td><td>Il est très fort. (He is very strong.)</td></tr>
              <tr><td>facile</td><td>easy</td><td>L'examen est facile. (The exam is easy.)</td></tr>
              <tr><td>difficile</td><td>difficult</td><td>C'est difficile à dire. (It's hard to say.)</td></tr>
              <tr><td>heureux</td><td>happy</td><td>Je suis heureux. (I'm happy.)</td></tr>
              <tr><td>triste</td><td>sad</td><td>Elle semble triste. (She seems sad.)</td></tr>
              <tr><td>important</td><td>important</td><td>C'est très important. (It's very important.)</td></tr>
              <tr><td>blanc</td><td>white</td><td>Un chat blanc. (A white cat.)</td></tr>
              <tr><td>noir</td><td>black</td><td>Le café noir. (Black coffee.)</td></tr>
              <tr><td>rouge</td><td>red</td><td>Une pomme rouge. (A red apple.)</td></tr>
              <tr><td>cher</td><td>expensive / dear</td><td>C'est trop cher. (It's too expensive.)</td></tr>
              <tr><td>possible</td><td>possible</td><td>C'est possible. (It's possible.)</td></tr>
              <tr><td>impossible</td><td>impossible</td><td>Ce n'est pas impossible. (It's not impossible.)</td></tr>
              <tr><td>prêt</td><td>ready</td><td>Es-tu prêt ? (Are you ready?)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>4. Adverbs & Question Words / Adverbes et questions (25 words)</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>toujours</td><td>always</td><td>Il est toujours en retard. (He is always late.)</td></tr>
              <tr><td>jamais</td><td>never</td><td>Je n'oublierai jamais. (I will never forget.)</td></tr>
              <tr><td>souvent</td><td>often</td><td>J'y vais souvent. (I go there often.)</td></tr>
              <tr><td>parfois</td><td>sometimes</td><td>Parfois je pleure. (Sometimes I cry.)</td></tr>
              <tr><td>ici</td><td>here</td><td>Viens ici. (Come here.)</td></tr>
              <tr><td>là</td><td>there</td><td>Il est là. (He is there.)</td></tr>
              <tr><td>bien</td><td>well</td><td>Très bien, merci. (Very well, thank you.)</td></tr>
              <tr><td>mal</td><td>badly</td><td>Je me sens mal. (I feel bad.)</td></tr>
              <tr><td>peu</td><td>a little</td><td>Juste un peu. (Just a little.)</td></tr>
              <tr><td>assez</td><td>enough</td><td>J'ai assez mangé. (I ate enough.)</td></tr>
              <tr><td>moins</td><td>less</td><td>Il parle moins. (He speaks less.)</td></tr>
              <tr><td>plus</td><td>more</td><td>J'en veux plus. (I want more.)</td></tr>
              <tr><td>déjà</td><td>already</td><td>Tu pars déjà ? (Are you leaving already?)</td></tr>
              <tr><td>encore</td><td>again / still</td><td>Encore une fois. (One more time.)</td></tr>
              <tr><td>enfin</td><td>finally / at last</td><td>Enfin seuls! (Finally alone!)</td></tr>
              <tr><td>tôt</td><td>early</td><td>Je me lève tôt. (I wake up early.)</td></tr>
              <tr><td>tard</td><td>late</td><td>Il se fait tard. (It's getting late.)</td></tr>
              <tr><td>vite</td><td>fast / quickly</td><td>Viens vite! (Come quickly!)</td></tr>
              <tr><td>ensemble</td><td>together</td><td>Nous sommes ensemble. (We are together.)</td></tr>
              <tr><td>pourquoi</td><td>why</td><td>Pourquoi tu pleures ? (Why are you crying?)</td></tr>
              <tr><td>comment</td><td>how</td><td>Comment ça va ? (How is it going?)</td></tr>
              <tr><td>combien</td><td>how much / many</td><td>Combien ça coûte ? (How much does it cost?)</td></tr>
              <tr><td>qui</td><td>who</td><td>Qui est là ? (Who is there?)</td></tr>
              <tr><td>quoi</td><td>what</td><td>Tu fais quoi ? (What are you doing?)</td></tr>
              <tr><td>donc</td><td>so / therefore</td><td>Je pense, donc je suis. (I think, therefore I am.)</td></tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 4: WORDS 201-600 */}
        <div id="words600" style={{ paddingBottom: '2.5rem', borderTop: '1px dashed var(--border-element)', paddingTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>Words 201–600 (~70% daily conversation coverage)</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
            Broaden your capabilities to include routine items, food orders, and daily activities.
          </p>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1rem' }}>1. Action & Daily Verbs / Verbes d'action (201-300)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--border-element)', padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-input)', marginBottom: '1.5rem' }}>
            <div><strong>jouer</strong> ➔ to play</div>
            <div><strong>lire</strong> ➔ to read</div>
            <div><strong>écrire</strong> ➔ to write</div>
            <div><strong>acheter</strong> ➔ to buy</div>
            <div><strong>vendre</strong> ➔ to sell</div>
            <div><strong>payer</strong> ➔ to pay</div>
            <div><strong>ouvrir</strong> ➔ to open</div>
            <div><strong>fermer</strong> ➔ to close</div>
            <div><strong>aider</strong> ➔ to help</div>
            <div><strong>envoyer</strong> ➔ to send</div>
            <div><strong>recevoir</strong> ➔ to receive</div>
            <div><strong>oublier</strong> ➔ to forget</div>
            <div><strong>apprendre</strong> ➔ to learn</div>
            <div><strong>choisir</strong> ➔ to choose</div>
            <div><strong>décider</strong> ➔ to decide</div>
            <div><strong>essayer</strong> ➔ to try</div>
            <div><strong>réussir</strong> ➔ to succeed</div>
            <div><strong>finir</strong> ➔ to finish</div>
            <div><strong>continuer</strong> ➔ to continue</div>
            <div><strong>écouter</strong> ➔ to listen</div>
            <div><strong>voyager</strong> ➔ to travel</div>
            <div><strong>conduire</strong> ➔ to drive</div>
            <div><strong>nager</strong> ➔ to swim</div>
            <div><strong>se lever</strong> ➔ to get up</div>
            <div><strong>se coucher</strong> ➔ to go to bed</div>
            <div><strong>préparer</strong> ➔ to prepare</div>
            <div><strong>cuisiner</strong> ➔ to cook</div>
            <div><strong>nettoyer</strong> ➔ to clean</div>
            <div><strong>casser</strong> ➔ to break</div>
            <div><strong>garder</strong> ➔ to keep</div>
            <div><strong>gagner</strong> ➔ to win</div>
            <div><strong>perdre</strong> ➔ to lose</div>
            <div><strong>espérer</strong> ➔ to hope</div>
            <div><strong>boire</strong> ➔ to drink</div>
            <div><strong>bouger</strong> ➔ to move</div>
            <div><strong>changer</strong> ➔ to change</div>
            <div><strong>utiliser</strong> ➔ to use</div>
          </div>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.25rem' }}>2. People, Body & Abstract Nouns / Noms de personnes & corps (301-400)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--border-element)', padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-input)', marginBottom: '1.5rem' }}>
            <div><strong>voisin</strong> ➔ neighbor</div>
            <div><strong>collègue</strong> ➔ colleague</div>
            <div><strong>patron</strong> ➔ boss</div>
            <div><strong>client</strong> ➔ customer</div>
            <div><strong>mari / femme</strong> ➔ husband / wife</div>
            <div><strong>fils / fille</strong> ➔ son / daughter</div>
            <div><strong>oncle / tante</strong> ➔ uncle / aunt</div>
            <div><strong>corps</strong> ➔ body</div>
            <div><strong>tête</strong> ➔ head</div>
            <div><strong>cheveux</strong> ➔ hair</div>
            <div><strong>visage</strong> ➔ face</div>
            <div><strong>nez / bouche</strong> ➔ nose / mouth</div>
            <div><strong>dent / oreille</strong> ➔ tooth / ear</div>
            <div><strong>bras / jambe / pied</strong> ➔ arm / leg / foot</div>
            <div><strong>cœur / sang</strong> ➔ heart / blood</div>
            <div><strong>maladie / douleur</strong> ➔ illness / pain</div>
            <div><strong>médecin / hôpital</strong> ➔ doctor / hospital</div>
            <div><strong>santé / vie / esprit</strong> ➔ health / life / mind</div>
            <div><strong>peur / courage</strong> ➔ fear / courage</div>
            <div><strong>joie / tristesse</strong> ➔ joy / sadness</div>
            <div><strong>colère / surprise</strong> ➔ anger / surprise</div>
            <div><strong>rêve / pensée</strong> ➔ dream / thought</div>
            <div><strong>vérité / mensonge</strong> ➔ truth / lie</div>
            <div><strong>erreur / solution</strong> ➔ mistake / solution</div>
            <div><strong>choix / décision</strong> ➔ choice / decision</div>
            <div><strong>guerre / paix / danger</strong> ➔ war / peace / danger</div>
            <div><strong>chien / chat / oiseau</strong> ➔ dog / cat / bird</div>
            <div><strong>soleil / lune / ciel</strong> ➔ sun / moon / sky</div>
            <div><strong>mer / plage / terre</strong> ➔ sea / beach / earth</div>
          </div>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.25rem' }}>3. Places, Objects & Food / Lieux, objets & nourriture (401-500)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--border-element)', padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-input)', marginBottom: '1.5rem' }}>
            <div><strong>appartement</strong> ➔ apartment</div>
            <div><strong>cuisine / salon</strong> ➔ kitchen / living room</div>
            <div><strong>salle de bain</strong> ➔ bathroom</div>
            <div><strong>mur / toit / fenêtre</strong> ➔ wall / roof / window</div>
            <div><strong>clé / table / chaise</strong> ➔ key / table / chair</div>
            <div><strong>ordinateur / téléphone</strong> ➔ computer / phone</div>
            <div><strong>cahier / stylo / papier</strong> ➔ notebook / pen / paper</div>
            <div><strong>musique / film / jeu</strong> ➔ music / movie / game</div>
            <div><strong>prix / banque / carte</strong> ➔ price / bank / card</div>
            <div><strong>magasin / marché</strong> ➔ store / market</div>
            <div><strong>vêtement / robe</strong> ➔ clothing / dress</div>
            <div><strong>chaussure / manteau</strong> ➔ shoe / coat</div>
            <div><strong>sac / montre / lunettes</strong> ➔ bag / watch / glasses</div>
            <div><strong>repas / dîner</strong> ➔ meal / dinner</div>
            <div><strong>pain / viande / poulet</strong> ➔ bread / meat / chicken</div>
            <div><strong>fruit / légume / pomme</strong> ➔ fruit / vegetable / apple</div>
            <div><strong>lait / café / thé / vin</strong> ➔ milk / coffee / tea / wine</div>
            <div><strong>verre / assiette / couteau</strong> ➔ glass / plate / knife</div>
            <div><strong>route / pont / bus / train</strong> ➔ road / bridge / bus / train</div>
            <div><strong>avion / vélo / gare</strong> ➔ plane / bicycle / station</div>
            <div><strong>bâtiment / centre-ville</strong> ➔ building / downtown</div>
            <div><strong>jardin / parc / forêt</strong> ➔ garden / park / forest</div>
            <div><strong>classe / professeur</strong> ➔ class / teacher</div>
            <div><strong>étudiant / livre / page</strong> ➔ student / book / page</div>
            <div><strong>mot / phrase / langue</strong> ➔ word / sentence / language</div>
          </div>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.25rem' }}>4. Adjectives, Adverbs & Connectors / Adjectifs & adverbes (501-600)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--border-element)', padding: '0.65rem', borderRadius: '8px', background: 'var(--bg-input)' }}>
            <div><strong>rapide / lent</strong> ➔ fast / slow</div>
            <div><strong>lourd / léger</strong> ➔ heavy / light</div>
            <div><strong>dur / mou</strong> ➔ hard / soft</div>
            <div><strong>riche / pauvre</strong> ➔ rich / poor</div>
            <div><strong>plein / vide</strong> ➔ full / empty</div>
            <div><strong>ouvert / fermé</strong> ➔ open / closed</div>
            <div><strong>propre / sale</strong> ➔ clean / dirty</div>
            <div><strong>clair / sombre</strong> ➔ bright / dark</div>
            <div><strong>long / court</strong> ➔ long / short</div>
            <div><strong>haut / bas / large</strong> ➔ high / low / wide</div>
            <div><strong>fatigué / malade</strong> ➔ tired / sick</div>
            <div><strong>vivant / meilleur / pire</strong> ➔ alive / better / worse</div>
            <div><strong>presque / seulement</strong> ➔ almost / only</div>
            <div><strong>pendant / depuis</strong> ➔ during / since</div>
            <div><strong>car / donc / alors / si</strong> ➔ because / so / then / if</div>
            <div><strong>bleu / vert / jaune / rose</strong> ➔ blue / green / yellow / pink</div>
            <div><strong>joyeux / sérieux / drôle</strong> ➔ joyful / serious / funny</div>
            <div><strong>parfait / génial / terrible</strong> ➔ perfect / awesome / terrible</div>
            <div><strong>silencieux / bruyant / fou</strong> ➔ silent / noisy / crazy</div>
            <div><strong>intelligent / stupide</strong> ➔ smart / stupid</div>
            <div><strong>intéressant / ennuyeux</strong> ➔ interesting / boring</div>
            <div><strong>sûr / dangereux / libre</strong> ➔ sure / dangerous / free</div>
            <div><strong>occupé / célèbre / normal</strong> ➔ busy / famous / normal</div>
          </div>
        </div>

        {/* SECTION 5: STRUCTURAL PILLARS */}
        <div id="pillars" style={{ paddingBottom: '1rem', borderTop: '1px dashed var(--border-element)', paddingTop: '1.5rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '800' }}>Structural Pillars / Piliers structurels</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
            Master these demonstratives, possessives, logical connectors, and priority structural words to speak fluently.
          </p>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800' }}>1. The 25 Absolute Priority Structural Words</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ce / cette</td><td>this/that (masc / fem)</td><td>Ce livre est bon. (This book is good.)</td></tr>
              <tr><td>ces</td><td>these/those</td><td>Ces enfants jouent. (Ces enfants jouent.)</td></tr>
              <tr><td>du / des</td><td>of the / some</td><td>Je veux du pain. (I want some bread.)</td></tr>
              <tr><td>au / aux</td><td>to the / at the (sing/plur)</td><td>Je vais au bureau. (I am going to the office.)</td></tr>
              <tr><td>en</td><td>of it / some / in</td><td>J'en veux trois. (I want three of them.)</td></tr>
              <tr><td>y</td><td>there / to it</td><td>J'y vais maintenant. (I am going there now.)</td></tr>
              <tr><td>que</td><td>that / which</td><td>Je sais que tu es là. (I know that you are there.)</td></tr>
              <tr><td>qui</td><td>who / which</td><td>L'homme qui parle. (The man who is speaking.)</td></tr>
              <tr><td>dont</td><td>whose / of which</td><td>Le livre dont tu parles. (The book you're talking about.)</td></tr>
              <tr><td>leur</td><td>their / to them</td><td>Je leur parle. (I speak to them.)</td></tr>
              <tr><td>lui</td><td>him / her</td><td>Je lui donne un cadeau. (I give him/her a gift.)</td></tr>
              <tr><td>ça</td><td>that / this (informal)</td><td>J'aime ça. (I like that.)</td></tr>
              <tr><td>tout / tous</td><td>all / everything</td><td>Tout est parfait. (Everything is perfect.)</td></tr>
              <tr><td>déjà</td><td>already</td><td>J'ai déjà fini. (I have already finished.)</td></tr>
              <tr><td>encore</td><td>still / again</td><td>Je travaille encore. (I am still working.)</td></tr>
              <tr><td>jamais</td><td>never</td><td>Je n'oublierai jamais. (I will never forget.)</td></tr>
              <tr><td>devoir</td><td>must / have to</td><td>Je dois partir. (I must leave.)</td></tr>
              <tr><td>pouvoir</td><td>can / be able to</td><td>Je peux t'aider. (I can help you.)</td></tr>
              <tr><td>vouloir</td><td>to want</td><td>Je veux comprendre. (I want to understand.)</td></tr>
              <tr><td>savoir</td><td>to know (facts)</td><td>Je sais la vérité. (I know the truth.)</td></tr>
              <tr><td>connaître</td><td>to know (people)</td><td>Je connais cette ville. (I know this city.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>2. Demonstratives, Possessives & Pronouns</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>cet</td><td>this/that (before vowel)</td><td>Cet appartement. (This apartment.)</td></tr>
              <tr><td>celui / celle</td><td>the one (masc / fem)</td><td>Prends celui-ci. (Take this one.)</td></tr>
              <tr><td>ceux / celles</td><td>those (masc / fem)</td><td>J'aime celles-ci. (I like these ones.)</td></tr>
              <tr><td>leurs / eux</td><td>their / them</td><td>Je vais avec eux. (I am going with them.)</td></tr>
              <tr><td>soi</td><td>oneself / yourself</td><td>Prendre soin de soi. (To take care of oneself.)</td></tr>
              <tr><td>quelqu'un</td><td>someone</td><td>Quelqu'un frappe. (Someone is knocking.)</td></tr>
              <tr><td>personne</td><td>nobody / anyone</td><td>Je ne vois personne. (I see nobody.)</td></tr>
              <tr><td>chacun</td><td>each one</td><td>Chacun a son opinion. (Everyone has their opinion.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>3. Connectors & Glue Words</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>lorsque</td><td>when (formal)</td><td>Lorsqu'il arrivera, appelle. (When he arrives, call.)</td></tr>
              <tr><td>puisque</td><td>since / seeing that</td><td>Puisque tu es là. (Since you are here.)</td></tr>
              <tr><td>tandis que</td><td>while / whereas</td><td>Elle étudie tandis qu'il dort. (She studies while he sleeps.)</td></tr>
              <tr><td>si / donc</td><td>if / therefore, so</td><td>Je pense, donc je suis. (I think, therefore I am.)</td></tr>
              <tr><td>puis / enfin</td><td>then / finally</td><td>Je mange, puis je sors. (I eat, then I go out.)</td></tr>
            </tbody>
          </table>

          <h4 style={{ color: 'var(--primary)', fontWeight: '800', marginTop: '1.5rem' }}>4. Quantifiers & Essentials</h4>
          <table className="manual-table">
            <thead>
              <tr>
                <th>French</th>
                <th>English</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>toutes / toute</td><td>all / whole</td><td>Toute la journée. (The whole day.)</td></tr>
              <tr><td>plusieurs</td><td>several</td><td>J'ai plusieurs questions. (I have several questions.)</td></tr>
              <tr><td>certains</td><td>certain / some</td><td>Certains pensent comme ça. (Some think that way.)</td></tr>
              <tr><td>beaucoup de</td><td>a lot of</td><td>J'ai beaucoup de temps. (I have a lot of time.)</td></tr>
              <tr><td>peu de</td><td>little / few</td><td>Il y a peu de chances. (There is little chance.)</td></tr>
              <tr><td>assez de</td><td>enough</td><td>J'ai assez d'argent. (I have enough money.)</td></tr>
              <tr><td>trop de</td><td>too much / many</td><td>Il y a trop de bruit. (There is too much noise.)</td></tr>
              <tr><td>cela</td><td>that (formal)</td><td>Cela ne m'intéresse pas. (That doesn't interest me.)</td></tr>
              <tr><td>voici / voilà</td><td>here is / there is</td><td>Voilà la solution! (That's the solution!)</td></tr>
              <tr><td>d'accord</td><td>okay / agreed</td><td>D'accord, je viens. (Okay, I'm coming.)</td></tr>
              <tr><td>bien sûr</td><td>of course</td><td>Bien sûr que oui. (Of course yes.)</td></tr>
              <tr><td>certainement</td><td>certainly</td><td>Je viendrai certainement. (I will certainly come.)</td></tr>
              <tr><td>absolument</td><td>absolutely</td><td>C'est absolument faux. (That is absolutely false.)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={onBack} className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
        🎓 Start Studying / Commencer à étudier
      </button>
    </div>
  );
}
