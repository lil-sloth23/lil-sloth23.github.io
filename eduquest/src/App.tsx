import React, { useState } from 'react';
import YearSelector from './YearSelector';
import QuestionNode from './QuestionNode';
import ResultModal from './ResultModal';
import SubjectSelector from './SubjectSelector';
import MapView from './MapView';

const YEARS = [8, 9, 10, 11, 12, 13]; // Now supports Year 8 to Year 13
const SUBJECTS = ['Biology', 'Maths', 'Chemistry', 'Physics'];

// Add a type for Biology topics
interface BiologyTopic {
  topic: string;
  questions: { prompt: string; answer: string }[];
}

// Biology topics and questions (sample, can be expanded)
const BIOLOGY_TOPICS: { [year: number]: BiologyTopic[] } = {
  8: [
    {
      topic: 'Cell Structure',
      questions: [
        { prompt: 'What is the basic unit of life?', answer: 'cell' },
        { prompt: 'Name the part of the cell that controls activities.', answer: 'nucleus' },
        { prompt: 'What structure is found in plant cells but not animal cells?', answer: 'cell wall' },
        { prompt: 'What is the function of chloroplasts?', answer: 'photosynthesis' },
        { prompt: 'What is cytoplasm?', answer: 'jelly-like substance where reactions happen' },
        { prompt: 'What is the function of the cell membrane?', answer: 'controls entry and exit of substances' },
      ],
    },
    {
      topic: 'Movement of Substances',
      questions: [
        { prompt: 'What is diffusion?', answer: 'movement of particles from high to low concentration' },
        { prompt: 'What is osmosis?', answer: 'movement of water from high to low concentration through a membrane' },
        { prompt: 'What is active transport?', answer: 'movement of substances against a concentration gradient using energy' },
        { prompt: 'Give an example of diffusion in the body.', answer: 'oxygen moving into blood in lungs' },
        { prompt: 'What is a partially permeable membrane?', answer: 'allows some substances to pass through' },
        { prompt: 'Why is osmosis important in plants?', answer: 'keeps cells turgid' },
      ],
    },
    {
      topic: 'Reproduction',
      questions: [
        { prompt: 'What is sexual reproduction?', answer: 'involves two parents and produces variation' },
        { prompt: 'What is asexual reproduction?', answer: 'one parent, no variation' },
        { prompt: 'What is fertilisation?', answer: 'fusion of gametes' },
        { prompt: 'What is a gamete?', answer: 'sex cell' },
        { prompt: 'What is pollination?', answer: 'transfer of pollen to stigma' },
        { prompt: 'What is the function of the ovary in plants?', answer: 'produces ovules' },
      ],
    },
  ],
  9: [
    {
      topic: 'Enzymes',
      questions: [
        { prompt: 'What are enzymes?', answer: 'biological catalysts' },
        { prompt: 'What affects enzyme activity?', answer: 'temperature and pH' },
        { prompt: 'What is the active site?', answer: 'region where substrate binds' },
        { prompt: 'What happens to enzymes at high temperatures?', answer: 'they denature' },
        { prompt: 'What is a substrate?', answer: 'the molecule an enzyme acts on' },
        { prompt: 'What is the optimum pH for most enzymes?', answer: '7' },
      ],
    },
    {
      topic: 'Respiration',
      questions: [
        { prompt: 'What is aerobic respiration?', answer: 'respiration using oxygen' },
        { prompt: 'What is the word equation for aerobic respiration?', answer: 'glucose + oxygen -> carbon dioxide + water' },
        { prompt: 'What is anaerobic respiration?', answer: 'respiration without oxygen' },
        { prompt: 'Where does respiration occur?', answer: 'mitochondria' },
        { prompt: 'What is produced in anaerobic respiration in muscles?', answer: 'lactic acid' },
        { prompt: 'Why do muscles get tired after anaerobic respiration?', answer: 'lactic acid builds up' },
      ],
    },
    {
      topic: 'Photosynthesis',
      questions: [
        { prompt: 'What is photosynthesis?', answer: 'process by which plants make food' },
        { prompt: 'What is the word equation for photosynthesis?', answer: 'carbon dioxide + water -> glucose + oxygen' },
        { prompt: 'What is chlorophyll?', answer: 'green pigment in plants' },
        { prompt: 'Where does photosynthesis occur?', answer: 'chloroplasts' },
        { prompt: 'What factors affect photosynthesis?', answer: 'light, temperature, CO2' },
        { prompt: 'What is a limiting factor?', answer: 'something that slows the rate of photosynthesis' },
      ],
    },
  ],
  10: [
    {
      topic: 'Cell Biology',
      questions: [
        { prompt: 'What is the function of the mitochondria?', answer: 'energy production' },
        { prompt: 'What is the function of ribosomes?', answer: 'protein synthesis' },
        { prompt: 'What is the process of cell division called?', answer: 'mitosis' },
        { prompt: 'What is the function of the cell membrane?', answer: 'controls entry and exit of substances' },
        { prompt: 'What is the difference between prokaryotic and eukaryotic cells?', answer: 'prokaryotic cells have no nucleus' },
        { prompt: 'What is the function of chloroplasts?', answer: 'photosynthesis' },
      ],
    },
    {
      topic: 'Organisation',
      questions: [
        { prompt: 'What is a tissue?', answer: 'a group of similar cells' },
        { prompt: 'What is an organ?', answer: 'a group of tissues' },
        { prompt: 'What is an organ system?', answer: 'a group of organs' },
        { prompt: 'What is the function of the heart?', answer: 'pumps blood' },
        { prompt: 'What is the function of the lungs?', answer: 'gas exchange' },
        { prompt: 'What is the function of enzymes in digestion?', answer: 'break down food' },
      ],
    },
    {
      topic: 'Cell Division',
      questions: [
        { prompt: 'What is mitosis?', answer: 'cell division for growth and repair' },
        { prompt: 'What is meiosis?', answer: 'cell division for gametes' },
        { prompt: 'How many daughter cells are produced in mitosis?', answer: '2' },
        { prompt: 'How many daughter cells are produced in meiosis?', answer: '4' },
        { prompt: 'What is the chromosome number after mitosis?', answer: 'same as parent' },
        { prompt: 'What is the chromosome number after meiosis?', answer: 'half the parent' },
      ],
    },
    {
      topic: 'Genetics',
      questions: [
        { prompt: 'What is a gene?', answer: 'a section of DNA' },
        { prompt: 'What is an allele?', answer: 'a version of a gene' },
        { prompt: 'What is a genotype?', answer: 'the genetic makeup' },
        { prompt: 'What is a phenotype?', answer: 'physical appearance' },
        { prompt: 'What is a dominant allele?', answer: 'an allele that is always expressed' },
        { prompt: 'What is a recessive allele?', answer: 'an allele only expressed if two copies are present' },
      ],
    },
  ],
  11: [
    {
      topic: 'Ecology',
      questions: [
        { prompt: 'What is a habitat?', answer: 'the place where an organism lives' },
        { prompt: 'What is a population?', answer: 'all the organisms of one species in an area' },
        { prompt: 'What is a community?', answer: 'all the populations of different species in an area' },
        { prompt: 'What is a producer?', answer: 'an organism that makes its own food' },
        { prompt: 'What is a consumer?', answer: 'an organism that eats other organisms' },
        { prompt: 'What is a decomposer?', answer: 'an organism that breaks down dead material' },
      ],
    },
    {
      topic: 'Evolution',
      questions: [
        { prompt: 'Who proposed the theory of evolution by natural selection?', answer: 'Charles Darwin' },
        { prompt: 'What is adaptation?', answer: 'a feature that helps survival' },
        { prompt: 'What is speciation?', answer: 'formation of new species' },
        { prompt: 'What is natural selection?', answer: 'survival of the fittest' },
        { prompt: 'What is variation?', answer: 'differences between individuals' },
        { prompt: 'What is extinction?', answer: 'when a species dies out' },
      ],
    },
    {
      topic: 'Inheritance',
      questions: [
        { prompt: 'What is DNA?', answer: 'genetic material' },
        { prompt: 'What is a chromosome?', answer: 'a thread of DNA' },
        { prompt: 'What is a gene?', answer: 'a section of DNA' },
        { prompt: 'What is a mutation?', answer: 'a change in DNA' },
        { prompt: 'What is a dominant allele?', answer: 'an allele that is always expressed' },
        { prompt: 'What is a recessive allele?', answer: 'an allele only expressed if two copies are present' },
      ],
    },
  ],
  12: [
    {
      topic: 'Biological Molecules',
      questions: [
        { prompt: 'What are the monomers of proteins?', answer: 'amino acids' },
        { prompt: 'What is the test for starch?', answer: 'iodine solution' },
        { prompt: 'What is the main function of DNA?', answer: 'store genetic information' },
        { prompt: 'What is the test for protein?', answer: 'biuret test' },
        { prompt: 'What is the test for glucose?', answer: "Benedict's test" },
        { prompt: 'What is the main function of lipids?', answer: 'energy storage' },
      ],
    },
    {
      topic: 'Cells',
      questions: [
        { prompt: 'What is the function of ribosomes?', answer: 'protein synthesis' },
        { prompt: 'What is the function of mitochondria?', answer: 'energy production' },
        { prompt: 'What is the function of the cell membrane?', answer: 'controls entry and exit of substances' },
        { prompt: 'What is the function of lysosomes?', answer: 'digest waste' },
        { prompt: 'What is the function of the nucleus?', answer: 'controls cell activities' },
        { prompt: 'What is the function of the Golgi apparatus?', answer: 'modifies and packages proteins' },
      ],
    },
    {
      topic: 'Exchange and Transport',
      questions: [
        { prompt: 'What is diffusion?', answer: 'movement of particles from high to low concentration' },
        { prompt: 'What is osmosis?', answer: 'movement of water from high to low concentration through a membrane' },
        { prompt: 'What is active transport?', answer: 'movement of substances against a concentration gradient using energy' },
        { prompt: 'What is the function of the lungs?', answer: 'gas exchange' },
        { prompt: 'What is the function of the heart?', answer: 'pumps blood' },
        { prompt: 'What is the function of red blood cells?', answer: 'carry oxygen' },
      ],
    },
  ],
  13: [
    {
      topic: 'Genetics and Populations',
      questions: [
        { prompt: 'What is a gene pool?', answer: 'all the genes in a population' },
        { prompt: 'What is genetic drift?', answer: 'change in allele frequency by chance' },
        { prompt: 'What is Hardy-Weinberg principle?', answer: 'allele frequencies remain constant unless acted on by forces' },
        { prompt: 'What is selection pressure?', answer: 'an environmental factor that affects survival' },
        { prompt: 'What is gene flow?', answer: 'movement of genes between populations' },
        { prompt: 'What is stabilizing selection?', answer: 'selection for the average phenotype' },
      ],
    },
    {
      topic: 'Control of Gene Expression',
      questions: [
        { prompt: 'What is a mutation?', answer: 'a change in DNA sequence' },
        { prompt: 'What is epigenetics?', answer: 'heritable changes in gene expression without DNA sequence change' },
        { prompt: 'What is RNA interference?', answer: 'regulation of gene expression by RNA molecules' },
        { prompt: 'What is a transcription factor?', answer: 'protein that controls transcription' },
        { prompt: 'What is a promoter region?', answer: 'region of DNA where transcription starts' },
        { prompt: 'What is a repressor?', answer: 'protein that inhibits gene expression' },
      ],
    },
    {
      topic: 'Photosynthesis and Respiration',
      questions: [
        { prompt: 'What is the main site of photosynthesis?', answer: 'chloroplasts' },
        { prompt: 'What is the main site of aerobic respiration?', answer: 'mitochondria' },
        { prompt: 'What is the main product of photosynthesis?', answer: 'glucose' },
        { prompt: 'What is the main product of aerobic respiration?', answer: 'ATP' },
        { prompt: 'What is the main waste product of aerobic respiration?', answer: 'carbon dioxide' },
        { prompt: 'What is the main waste product of photosynthesis?', answer: 'oxygen' },
      ],
    },
  ],
};

// Add Maths topics and questions for years 8-13 based on AQA GCSE and A-level specifications
interface MathsTopic {
  topic: string;
  questions: { prompt: string; answer: string; explanation?: string }[];
}

const MATHS_TOPICS: { [year: number]: MathsTopic[] } = {
  8: [
    {
      topic: 'Number - Place Value',
      questions: [
        { prompt: 'What is the value of the digit 7 in 3,742?', answer: '700', explanation: 'The 7 is in the hundreds place.' },
        { prompt: 'Round 4,678 to the nearest hundred.', answer: '4,700', explanation: 'Look at the tens digit to round.' },
        { prompt: 'What is 3,000 + 700 + 40 + 2?', answer: '3,742', explanation: 'This is the expanded form.' },
      ],
    },
    {
      topic: 'Fractions',
      questions: [
        { prompt: 'What is 1/2 + 1/4?', answer: '3/4', explanation: 'Find a common denominator.' },
        { prompt: 'What is 2/3 of 12?', answer: '8', explanation: 'Multiply 12 by 2/3.' },
        { prompt: 'Simplify 6/9.', answer: '2/3', explanation: 'Divide numerator and denominator by 3.' },
      ],
    },
    {
      topic: 'Decimals',
      questions: [
        { prompt: 'What is 0.6 + 0.15?', answer: '0.75', explanation: 'Add as normal numbers.' },
        { prompt: 'Round 3.141 to 2 decimal places.', answer: '3.14', explanation: 'Look at the third decimal.' },
        { prompt: 'What is 0.25 as a fraction?', answer: '1/4', explanation: '0.25 = 25/100 = 1/4.' },
      ],
    },
    {
      topic: 'Percentages',
      questions: [
        { prompt: 'What is 10% of 250?', answer: '25', explanation: '10% = 0.1 × 250.' },
        { prompt: 'Increase 80 by 25%.', answer: '100', explanation: '80 × 1.25 = 100.' },
        { prompt: 'Express 30 as a percentage of 200.', answer: '15%', explanation: '30/200 × 100 = 15%.' },
      ],
    },
  ],
  9: [
    {
      topic: 'Algebra - Expressions',
      questions: [
        { prompt: 'Simplify: 2x + 3x', answer: '5x', explanation: 'Add like terms.' },
        { prompt: 'Expand: 3(x + 4)', answer: '3x + 12', explanation: 'Multiply 3 by both x and 4.' },
        { prompt: 'Factorise: x^2 + 5x', answer: 'x(x + 5)', explanation: 'Take out the common factor x.' },
      ],
    },
    {
      topic: 'Geometry - Angles',
      questions: [
        { prompt: 'What is the sum of angles in a triangle?', answer: '180', explanation: 'All triangles add up to 180 degrees.' },
        { prompt: 'What is the sum of angles on a straight line?', answer: '180', explanation: 'A straight line is 180 degrees.' },
        { prompt: 'What is the sum of angles at a point?', answer: '360', explanation: 'A full turn is 360 degrees.' },
      ],
    },
    {
      topic: 'Ratio and Proportion',
      questions: [
        { prompt: 'Simplify the ratio 8:12.', answer: '2:3', explanation: 'Divide both by 4.' },
        { prompt: 'If 3 pens cost £1.50, what is the cost of 5 pens?', answer: '£2.50', explanation: '£1.50/3 = £0.50 per pen, 5 × £0.50 = £2.50.' },
        { prompt: 'Divide £60 in the ratio 2:3.', answer: '£24 and £36', explanation: '2+3=5, £60/5=£12, 2×£12=£24, 3×£12=£36.' },
      ],
    },
    {
      topic: 'Probability',
      questions: [
        { prompt: 'What is the probability of rolling a 3 on a fair die?', answer: '1/6', explanation: 'There are 6 outcomes.' },
        { prompt: 'What is the probability of flipping heads on a coin?', answer: '1/2', explanation: 'Two outcomes: heads or tails.' },
        { prompt: 'If a bag has 3 red and 2 blue balls, what is the probability of picking a blue?', answer: '2/5', explanation: '2 blue out of 5 total.' },
      ],
    },
  ],
  10: [
    {
      topic: 'Linear Graphs',
      questions: [
        { prompt: 'Solve: 2x + 3 = 11', answer: '4', explanation: 'Subtract 3, then divide by 2.' },
        { prompt: 'y = 10x + 20. What are intercepts?', answer: 'y-int = 20; x-int = -2.00', explanation: 'Set x=0 for y-int, y=0 for x-int.' },
        { prompt: 'm = 10; point = (3, 5); find c', answer: '-25', explanation: 'Use y = mx + c, plug in values.' },
      ],
    },
    {
      topic: 'Quadratic Equations',
      questions: [
        { prompt: 'Solve: x^2 - 9 = 0', answer: 'x = 3 or x = -3', explanation: 'x^2 = 9, so x = ±3.' },
        { prompt: 'Factorise: x^2 + 5x + 6', answer: '(x + 2)(x + 3)', explanation: 'Find two numbers that multiply to 6 and add to 5.' },
        { prompt: 'What is the vertex of y = (x - 1)^2 + 2?', answer: '(1, 2)', explanation: 'Vertex form is y = (x - h)^2 + k.' },
      ],
    },
    {
      topic: 'Simultaneous Equations',
      questions: [
        { prompt: 'Solve: x + y = 10, x - y = 2', answer: 'x = 6, y = 4', explanation: 'Add and subtract equations.' },
        { prompt: 'Solve: 2x + 3y = 12, x - y = 1', answer: 'x = 3, y = 2', explanation: 'Substitute or eliminate.' },
        { prompt: 'What is the graphical solution to simultaneous equations?', answer: 'Intersection point', explanation: 'Where the lines cross.' },
      ],
    },
    {
      topic: 'Trigonometry',
      questions: [
        { prompt: 'What is sin(30°)?', answer: '0.5', explanation: 'sin(30°) = 1/2.' },
        { prompt: 'What is cos(60°)?', answer: '0.5', explanation: 'cos(60°) = 1/2.' },
        { prompt: 'What is tan(45°)?', answer: '1', explanation: 'tan(45°) = 1.' },
      ],
    },
  ],
  11: [
    {
      topic: 'Functions',
      questions: [
        { prompt: 'What is the value of f(x) = 2x + 3 when x = 4?', answer: '11', explanation: '2×4+3=11.' },
        { prompt: 'If f(x) = x^2, what is f(3)?', answer: '9', explanation: '3 squared is 9.' },
        { prompt: 'If f(x) = 5, what is f(10)?', answer: '5', explanation: 'Constant function.' },
      ],
    },
    {
      topic: 'Surds',
      questions: [
        { prompt: 'Simplify √50.', answer: '5√2', explanation: '√50 = √(25×2) = 5√2.' },
        { prompt: 'Simplify √18.', answer: '3√2', explanation: '√18 = √(9×2) = 3√2.' },
        { prompt: 'What is (2√3)^2?', answer: '12', explanation: '(2√3)^2 = 4×3 = 12.' },
      ],
    },
    {
      topic: 'Inequalities',
      questions: [
        { prompt: 'Solve: x + 3 > 7', answer: 'x > 4', explanation: 'Subtract 3 from both sides.' },
        { prompt: 'Solve: 2x ≤ 10', answer: 'x ≤ 5', explanation: 'Divide both sides by 2.' },
        { prompt: 'What is the solution set for x^2 < 9?', answer: '-3 < x < 3', explanation: 'x^2 < 9 means x is between -3 and 3.' },
      ],
    },
  ],
  12: [
    {
      topic: 'Differentiation',
      questions: [
        { prompt: 'Differentiate y = x^2', answer: '2x', explanation: 'Power rule: bring down the power.' },
        { prompt: 'Differentiate y = 3x^3', answer: '9x^2', explanation: '3 × 3x^2 = 9x^2.' },
        { prompt: 'What is the derivative of a constant?', answer: '0', explanation: 'Derivative of any constant is zero.' },
      ],
    },
    {
      topic: 'Integration',
      questions: [
        { prompt: 'Integrate y = 2x', answer: 'x^2 + C', explanation: 'Increase the power by 1 and divide.' },
        { prompt: 'Integrate y = 3', answer: '3x + C', explanation: 'Integral of a constant is constant × x.' },
        { prompt: 'What is the integral of x^2?', answer: '(1/3)x^3 + C', explanation: 'Add 1 to the power, divide by new power.' },
      ],
    },
    {
      topic: 'Exponentials and Logarithms',
      questions: [
        { prompt: 'What is log(100)?', answer: '2', explanation: 'log base 10 of 100 is 2.' },
        { prompt: 'What is e^0?', answer: '1', explanation: 'Any number to the power 0 is 1.' },
        { prompt: 'What is ln(e)?', answer: '1', explanation: 'Natural log of e is 1.' },
      ],
    },
  ],
  13: [
    {
      topic: 'Vectors',
      questions: [
        { prompt: 'What is a vector?', answer: 'A quantity with magnitude and direction', explanation: 'Vectors have both size and direction.' },
        { prompt: 'What is the magnitude of vector (3, 4)?', answer: '5', explanation: 'Use Pythagoras: sqrt(3^2 + 4^2) = 5.' },
        { prompt: 'Add vectors (1,2) and (3,4)', answer: '(4,6)', explanation: 'Add components separately.' },
      ],
    },
    {
      topic: 'Proof',
      questions: [
        { prompt: 'What is a proof by contradiction?', answer: 'Assume the opposite and reach a contradiction', explanation: 'Show the assumption leads to an impossibility.' },
        { prompt: 'What is a counterexample?', answer: 'An example that disproves a statement', explanation: 'A single example can disprove a general statement.' },
        { prompt: 'What is a direct proof?', answer: 'Logical steps from premises to conclusion', explanation: 'Directly show the statement is true.' },
      ],
    },
    {
      topic: 'Sequences and Series',
      questions: [
        { prompt: 'What is the nth term of the sequence 2, 4, 6, 8, ...?', answer: '2n', explanation: 'It increases by 2 each time.' },
        { prompt: 'What is the sum of the first 10 natural numbers?', answer: '55', explanation: 'Sum = n(n+1)/2.' },
        { prompt: 'What is the common ratio in the sequence 3, 6, 12, 24, ...?', answer: '2', explanation: 'Each term is multiplied by 2.' },
      ],
    },
  ],
};

// Add Chemistry topics and questions for years 8-13 based on AQA GCSE and A-level specifications
interface ChemistryTopic {
  topic: string;
  questions: { prompt: string; answer: string; explanation?: string }[];
}

const CHEMISTRY_TOPICS: { [year: number]: ChemistryTopic[] } = {
  8: [
    {
      topic: 'States of Matter',
      questions: [
        { prompt: 'What are the three states of matter?', answer: 'solid, liquid, gas', explanation: 'The three main states are solid, liquid, and gas.' },
        { prompt: 'What process turns a solid into a liquid?', answer: 'melting', explanation: 'Melting is when a solid becomes a liquid.' },
        { prompt: 'What is evaporation?', answer: 'liquid to gas', explanation: 'Evaporation is the process of a liquid turning into a gas.' },
      ],
    },
    {
      topic: 'Elements, Compounds, Mixtures',
      questions: [
        { prompt: 'What is an element?', answer: 'a substance made of one type of atom', explanation: 'Elements are pure substances.' },
        { prompt: 'What is a compound?', answer: 'two or more elements chemically combined', explanation: 'Compounds are made from different elements.' },
        { prompt: 'What is a mixture?', answer: 'two or more substances not chemically combined', explanation: 'Mixtures can be separated physically.' },
      ],
    },
  ],
  9: [
    {
      topic: 'Atomic Structure',
      questions: [
        { prompt: 'What is the center of an atom called?', answer: 'nucleus', explanation: 'The nucleus contains protons and neutrons.' },
        { prompt: 'What charge does a proton have?', answer: 'positive', explanation: 'Protons are positively charged.' },
        { prompt: 'What charge does an electron have?', answer: 'negative', explanation: 'Electrons are negatively charged.' },
      ],
    },
    {
      topic: 'Periodic Table',
      questions: [
        { prompt: 'Who created the first periodic table?', answer: 'Mendeleev', explanation: 'Dmitri Mendeleev created the first periodic table.' },
        { prompt: 'What are columns in the periodic table called?', answer: 'groups', explanation: 'Columns are called groups.' },
        { prompt: 'What are rows in the periodic table called?', answer: 'periods', explanation: 'Rows are called periods.' },
      ],
    },
  ],
  10: [
    {
      topic: 'Bonding, Structure, Properties',
      questions: [
        { prompt: 'What type of bond forms between metals and non-metals?', answer: 'ionic', explanation: 'Ionic bonds form between metals and non-metals.' },
        { prompt: 'What type of bond forms between non-metals?', answer: 'covalent', explanation: 'Covalent bonds form between non-metals.' },
        { prompt: 'What is a giant covalent structure?', answer: 'a large network of atoms bonded covalently', explanation: 'Diamond is an example.' },
      ],
    },
    {
      topic: 'Chemical Changes',
      questions: [
        { prompt: 'What is oxidation?', answer: 'loss of electrons', explanation: 'Oxidation is loss of electrons.' },
        { prompt: 'What is reduction?', answer: 'gain of electrons', explanation: 'Reduction is gain of electrons.' },
        { prompt: 'What is electrolysis?', answer: 'splitting using electricity', explanation: 'Electrolysis splits compounds using electricity.' },
      ],
    },
    {
      topic: 'Quantitative Chemistry',
      questions: [
        { prompt: 'What is the unit for amount of substance?', answer: 'mole', explanation: 'The mole is the SI unit.' },
        { prompt: 'What is the formula for concentration?', answer: 'mass/volume', explanation: 'Concentration = mass/volume.' },
        { prompt: 'What is the relative atomic mass symbol?', answer: 'Ar', explanation: 'Ar stands for relative atomic mass.' },
      ],
    },
  ],
  11: [
    {
      topic: 'Energy Changes',
      questions: [
        { prompt: 'What is an exothermic reaction?', answer: 'releases heat', explanation: 'Exothermic reactions release heat.' },
        { prompt: 'What is an endothermic reaction?', answer: 'absorbs heat', explanation: 'Endothermic reactions absorb heat.' },
        { prompt: 'What is activation energy?', answer: 'minimum energy needed to start a reaction', explanation: 'Activation energy is the minimum energy required.' },
      ],
    },
    {
      topic: 'Rates of Reaction',
      questions: [
        { prompt: 'What increases the rate of reaction?', answer: 'temperature, concentration, surface area, catalyst', explanation: 'All these factors increase rate.' },
        { prompt: 'What is a catalyst?', answer: 'speeds up reaction', explanation: 'A catalyst speeds up a reaction.' },
        { prompt: 'What is the effect of temperature on rate?', answer: 'increases rate', explanation: 'Higher temperature increases rate.' },
      ],
    },
    {
      topic: 'Organic Chemistry',
      questions: [
        { prompt: 'What is the simplest alkane?', answer: 'methane', explanation: 'Methane is CH4.' },
        { prompt: 'What is the functional group of alcohols?', answer: 'OH', explanation: 'Alcohols have the -OH group.' },
        { prompt: 'What is the general formula for alkanes?', answer: 'CnH2n+2', explanation: 'Alkanes have the formula CnH2n+2.' },
      ],
    },
  ],
  12: [
    {
      topic: 'Thermodynamics',
      questions: [
        { prompt: 'What is enthalpy?', answer: 'heat content', explanation: 'Enthalpy is the heat content of a system.' },
        { prompt: 'What is entropy?', answer: 'measure of disorder', explanation: 'Entropy measures disorder.' },
        { prompt: 'What is Gibbs free energy?', answer: 'energy available to do work', explanation: 'Gibbs free energy = enthalpy - temperature × entropy.' },
      ],
    },
    {
      topic: 'Equilibria',
      questions: [
        { prompt: 'What is dynamic equilibrium?', answer: 'forward and backward reactions at same rate', explanation: 'Dynamic equilibrium is when both rates are equal.' },
        { prompt: 'What is Le Chatelier's principle?', answer: 'system opposes change', explanation: 'A system at equilibrium opposes changes.' },
        { prompt: 'What is the equilibrium constant symbol?', answer: 'Kc', explanation: 'Kc is the equilibrium constant.' },
      ],
    },
    {
      topic: 'Redox and Electrochemistry',
      questions: [
        { prompt: 'What is a redox reaction?', answer: 'transfer of electrons', explanation: 'Redox involves electron transfer.' },
        { prompt: 'What is a standard electrode potential?', answer: 'potential of a half-cell', explanation: 'Standard electrode potential is for a half-cell.' },
        { prompt: 'What is the salt bridge for?', answer: 'completes the circuit', explanation: 'Salt bridge completes the circuit in electrochemical cells.' },
      ],
    },
  ],
  13: [
    {
      topic: 'Aromatic Chemistry',
      questions: [
        { prompt: 'What is benzene?', answer: 'an aromatic hydrocarbon', explanation: 'Benzene is a ring of 6 carbons.' },
        { prompt: 'What is the formula for benzene?', answer: 'C6H6', explanation: 'Benzene is C6H6.' },
        { prompt: 'What is electrophilic substitution?', answer: 'reaction where an electrophile replaces a group', explanation: 'Electrophilic substitution is common in benzene.' },
      ],
    },
    {
      topic: 'Amino Acids, Proteins, DNA',
      questions: [
        { prompt: 'What is the monomer of proteins?', answer: 'amino acid', explanation: 'Proteins are made of amino acids.' },
        { prompt: 'What is the structure of DNA?', answer: 'double helix', explanation: 'DNA is a double helix.' },
        { prompt: 'What is a peptide bond?', answer: 'bond between amino acids', explanation: 'Peptide bonds join amino acids.' },
      ],
    },
    {
      topic: 'Transition Metals',
      questions: [
        { prompt: 'What is a transition metal?', answer: 'element with a partially filled d-subshell', explanation: 'Transition metals have incomplete d-subshells.' },
        { prompt: 'What is a ligand?', answer: 'molecule that binds to a metal ion', explanation: 'Ligands bind to metal ions.' },
        { prompt: 'What is a complex ion?', answer: 'ion with a central metal and ligands', explanation: 'Complex ions have a metal and ligands.' },
      ],
    },
  ],
};

function App() {
  const [year, setYear] = useState<number | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [topicIndex, setTopicIndex] = useState<number>(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [result, setResult] = useState<{ allCorrect: boolean; userAnswers: string[] } | null>(null);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [history, setHistory] = useState<string[]>([]); // Track navigation history
  const [showHome, setShowHome] = useState(true);

  const handleSelectYear = (y: number) => {
    setYear(y);
    setSubject(null);
    setShowQuestions(false);
    setResult(null);
    setTopicIndex(0);
    setCompleted([]);
    setHistory(['year']);
  };

  const handleSelectSubject = (s: string) => {
    setSubject(s);
    setShowQuestions(false);
    setResult(null);
    setTopicIndex(0);
    setCompleted([]);
    setHistory((h) => [...h, 'subject']);
  };

  const handleSelectTopic = (i: number) => {
    setTopicIndex(i);
    setShowQuestions(false);
    setResult(null);
    setHistory((h) => [...h, 'topic']);
  };

  const handleStartQuestions = () => {
    setShowQuestions(true);
    setResult(null);
    setHistory((h) => [...h, 'questions']);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    if (prev === 'questions') {
      setShowQuestions(false);
      setResult(null);
    } else if (prev === 'topic') {
      setShowQuestions(false);
      setResult(null);
    } else if (prev === 'subject') {
      setSubject(null);
      setShowQuestions(false);
      setResult(null);
      setTopicIndex(0);
      setCompleted([]);
    } else if (prev === 'year') {
      setYear(null);
      setSubject(null);
      setShowQuestions(false);
      setResult(null);
      setTopicIndex(0);
      setCompleted([]);
    }
  };

  const handleComplete = (allCorrect: boolean, userAnswers: string[]) => {
    setResult({ allCorrect, userAnswers });
    setShowQuestions(false);
    if (allCorrect) {
      setCompleted((prev) => {
        const arr = [...prev];
        arr[topicIndex] = true;
        return arr;
      });
    }
  };

  const handleReplay = () => {
    setShowQuestions(true);
    setResult(null);
  };

  const handleQuit = () => {
    setShowQuestions(false);
    setResult(null);
    setYear(null);
    setSubject(null);
    setTopicIndex(0);
    setCompleted([]);
  };

  const handleNextTopic = () => {
    if (year && subject === 'Biology' && topicIndex < (topics.length - 1)) {
      setTopicIndex(topicIndex + 1);
      setShowQuestions(true);
      setResult(null);
    }
  };

  // Only Biology and Maths for now
  let topics: any[] = [];
  if (year && subject === 'Biology') {
    topics = BIOLOGY_TOPICS[year] || [];
  } else if (year && subject === 'Maths') {
    topics = MATHS_TOPICS[year] || [];
  } else if (year && subject === 'Chemistry') {
    topics = CHEMISTRY_TOPICS[year] || [];
  }
  const currentTopic = topics && topics[topicIndex];

  React.useEffect(() => {
    if (topics.length && completed.length !== topics.length) {
      setCompleted(Array(topics.length).fill(false));
    }
    // eslint-disable-next-line
  }, [topics.length]);

  return (
    <div style={{ maxWidth: 540, margin: '2rem auto', padding: '1.5rem', background: '#2c2c2c', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.3)', transition: 'all 0.4s cubic-bezier(.4,2,.6,1)' }}>
      {showHome ? (
        <div style={{ textAlign: 'center', animation: 'fadeInScale 0.6s' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '1px' }}>EduQuest</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '2rem' }}>
            Welcome to EduQuest!<br />
            Embark on a learning adventure for Years 8–13 in Biology, Maths, Chemistry, and Physics.<br />
            Select your year, pick a subject, and master each topic through interactive questions and a visual map.
          </p>
          <button onClick={() => setShowHome(false)} style={{ fontSize: '1.2rem', padding: '0.8rem 2.5rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 8px #007bff44' }}>
            Start
          </button>
        </div>
      ) : (
        <>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '1px', textAlign: 'center', transition: 'all 0.4s' }}>EduQuest</h1>
          {(year || subject || showQuestions) && (
            <button onClick={handleBack} style={{ marginBottom: '1rem', background: '#555', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 1.2rem', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}>
              ← Back
            </button>
          )}
          {!year && (
            <>
              <p style={{ textAlign: 'center' }}>Welcome! Start your journey by selecting your year.</p>
              <YearSelector years={YEARS} selectedYear={10} onSelectYear={handleSelectYear} />
            </>
          )}
          {year && !subject && (
            <SubjectSelector subjects={SUBJECTS} selectedSubject={null} onSelectSubject={handleSelectSubject} />
          )}
          {year && (subject === 'Biology' || subject === 'Maths' || subject === 'Chemistry') && topics.length > 0 && (
            <>
              <div style={{ margin: '1rem 0' }}>
                <div style={{ height: 16, background: '#333', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ width: `${Math.round((completed.filter(Boolean).length / topics.length) * 100)}%`, height: '100%', background: '#007bff', transition: 'width 0.4s', borderRadius: 8 }} />
                </div>
                <div style={{ color: '#ccc', fontSize: '0.95rem', textAlign: 'right' }}>
                  Progress: {completed.filter(Boolean).length} / {topics.length} topics mastered
                </div>
      </div>
              <MapView
                topics={topics}
                currentTopicIndex={topicIndex}
                onSelectTopic={handleSelectTopic}
                completed={completed}
              />
            </>
          )}
          {year && (subject === 'Biology' || subject === 'Maths' || subject === 'Chemistry') && !showQuestions && !result && currentTopic && (
            <>
              <h2 style={{ textAlign: 'center', margin: '1rem 0' }}>Topic: {currentTopic.topic}</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => setShowQuestions(true)} style={{ fontSize: '1.1rem', padding: '0.7rem 2rem', margin: '1rem 0' }}>Start Questions</button>
      </div>
            </>
          )}
          {showQuestions && currentTopic && (
            <QuestionNode
              questions={currentTopic.questions}
              subject={subject!}
              year={year!}
              topic={currentTopic.topic}
              onComplete={handleComplete}
            />
          )}
          {result && currentTopic && (
            <ResultModal
              allCorrect={result.allCorrect}
              userAnswers={result.userAnswers}
              questions={currentTopic.questions}
              onReplay={handleReplay}
              onQuit={handleQuit}
              onNextYear={handleNextTopic}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
