# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
data =
  {
    source: "College Board SAT Practice Test 1",
    passage:
      "Akira came directly, breaking all tradition. Was
      that it? Had he followed form—had he asked his
      mother to speak to his father to approach a
      go-between—would Chie have been more receptive?
      He came on a winter’s eve. He pounded on the
      door while a cold rain beat on the shuttered veranda,
      so at first Chie thought him only the wind. The maid
      knew better. Chie heard her soft scuttling footsteps,
      the creak of the door. Then the maid brought a
      calling card to the drawing room, for Chie.
      Chie was reluctant to go to her guest; perhaps she
      was feeling too cozy. She and Naomi were reading at
      a low table set atop a charcoal brazier. A thick quilt
      spread over the sides of the table so their legs were
      tucked inside with the heat.
      “Who is it at this hour, in this weather?” Chie
      questioned as she picked the name card off the
      maid’s lacquer tray.
      “Shinoda, Akira. Kobe Dental College,” she read.
      Naomi recognized the name. Chie heard a soft
      intake of air.
      “I think you should go,” said Naomi.

      Akira was waiting in the entry. He was in his early
      twenties, slim and serious, wearing the black
      military-style uniform of a student. As he
      bowed—his hands hanging straight down, a
      black cap in one, a yellow oil-paper umbrella in the
      other—Chie glanced beyond him. In the glistening
      surface of the courtyard’s rain-drenched paving
      stones, she saw his reflection like a dark double.
      “Madame,” said Akira, “forgive my disruption,
      but I come with a matter of urgency.”
      His voice was soft, refined. He straightened and
      stole a deferential peek at her face.
      In the dim light his eyes shone with sincerity.
      Chie felt herself starting to like him.
      “Come inside, get out of this nasty night. Surely
      your business can wait for a moment or two.”
      “I don’t want to trouble you. Normally I would
      approach you more properly but I’ve received word
      of a position. I’ve an opportunity to go to America, as
      dentist for Seattle’s Japanese community.”
      “Congratulations,” Chie said with amusement.
      “That is an opportunity, I’m sure. But how am I
      involved?”
      Even noting Naomi’s breathless reaction to the
      name card, Chie had no idea. Akira’s message,
      delivered like a formal speech, filled her with
      maternal amusement. You know how children speak
      so earnestly, so hurriedly, so endearingly about
      things that have no importance in an adult’s mind?
      That’s how she viewed him, as a child.


      It was how she viewed Naomi. Even though
      Naomi was eighteen and training endlessly in the arts
      needed to make a good marriage, Chie had made no
      effort to find her a husband.
      Akira blushed.
      “Depending on your response, I may stay in
      Japan. I’ve come to ask for Naomi’s hand.”
      Suddenly Chie felt the dampness of the night.
      “Does Naomi know anything of your . . .
      ambitions?”
      “We have an understanding. Please don’t judge
      my candidacy by the unseemliness of this proposal. I
      ask directly because the use of a go-between takes
      much time. Either method comes down to the same
      thing: a matter of parental approval. If you give your
      consent, I become Naomi’s yoshi.* We’ll live in the
      House of Fuji. Without your consent, I must go to
      America, to secure a new home for my bride.”
      Eager to make his point, he’d been looking her full
      in the face. Abruptly, his voice turned gentle. “I see
      I’ve startled you. My humble apologies. I’ll take no
      more of your evening. My address is on my card. If
      you don’t wish to contact me, I’ll reapproach you in
      two weeks’ time. Until then, good night.”
      He bowed and left. Taking her ease, with effortless
      grace, like a cat making off with a fish.
      “Mother?” Chie heard Naomi’s low voice and
      turned from the door. “He has asked you?”
      The sight of Naomi’s clear eyes, her dark brows
      gave Chie strength. Maybe his hopes were
      preposterous.
      “Where did you meet such a fellow? Imagine! He
      thinks he can marry the Fuji heir and take her to
      America all in the snap of his fingers!”
      Chie waited for Naomi’s ripe laughter.
      Naomi was silent. She stood a full half minute
      looking straight into Chie’s eyes. Finally, she spoke.
      “I met him at my literary meeting.”
      Naomi turned to go back into the house, then
      stopped.
      “Mother.”
      “Yes?”
      “I mean to have him.”",
    problems: [
      {
        name: "Reading Test Question 1",
        question: "Which choice best describes what happens in the passage?",
        answer_choices: [
          {text: "A) One character argues with another character
          who intrudes on her home.", correct: false},
          {text: "B) One character receives a surprising request from
          another character.", correct: false},
          {text: "C) One character reminisces about choices she has
          made over the years.", correct: true},
          {text: "D) One character criticizes another character for
          pursuing an unexpected course of action.", correct: false}
        ]
      },
      {
        name: 'Reading Test Question 2',
        question: "As used in line 1 and line 65, “directly” most nearly means",
        answer_choices: [
          {text: "A) frankly.", correct: true},
          {text: "B) confidently.", correct: false},
          {text: "C) without mediation.", correct: false},
          {text: "D) with precision.", correct: false}
        ]
      }
    ]
  }

text = Text.find_or_create_by(content: data[:passage])
source = Source.find_or_create_by(name: data[:source])
data[:problems].each do |p|
  p1 = Problem.create(number: p[:name], question: p[:question], texts: [text], source: source)
  p[:answer_choices].each do |ac|
    AnswerChoice.find_or_create_by(problem: p1, text: ac[:text], correct: ac[:correct])
  end
end

Source.find_or_create_by(name: 'Original')