import random
from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class Question:
    prompt: str
    answer: str

@dataclass
class TopicNode:
    year: int
    subject: str
    topic: str
    questions: List[Question]

# --- Question Generator for Maths Y10: Linear Graphs ---
def generator_linear_graphs(year: int) -> TopicNode:
    # For MVP, static questions as per PRD sample
    questions = [
        Question(prompt="Solve: 2x + 3 = 11", answer="4"),
        Question(prompt="y = 10x + 20. What are intercepts?", answer="y-int = 20; x-int = -2.00"),
        Question(prompt="m = 10; point = (3, 5); find c", answer="-25"),
    ]
    return TopicNode(year=year, subject="Maths", topic="Linear Graphs", questions=questions)

# --- CLI Loop ---
def ask_question(question: Question) -> bool:
    print(f"\n{question.prompt}")
    user_answer = input("Your answer: ").strip()
    if user_answer.lower() == question.answer.lower():
        print("Correct!\n")
        return True
    else:
        print(f"Incorrect. Correct answer: {question.answer}\n")
        return False

def play_topic_node(topic_node: TopicNode) -> bool:
    print(f"\n--- {topic_node.subject} Y{topic_node.year} – {topic_node.topic} ---")
    all_correct = True
    for i, q in enumerate(topic_node.questions, 1):
        print(f"Question {i}:")
        correct = ask_question(q)
        if not correct:
            all_correct = False
    if all_correct:
        print("\nCongratulations! Node Mastered. ⭐\n")
    else:
        print("\nYou missed some questions. Try again!\n")
    return all_correct

def main():
    print("Welcome to EduQuest CLI MVP!")
    years = [10]  # For MVP, only Year 10
    while True:
        print("\nSelect your year:")
        for y in years:
            print(f"  {y}")
        year = input("Enter year (default 10): ").strip()
        if not year:
            year = 10
        else:
            try:
                year = int(year)
                if year not in years:
                    print("Invalid year. Defaulting to 10.")
                    year = 10
            except ValueError:
                print("Invalid input. Defaulting to 10.")
                year = 10
        # Only one topic for MVP
        topic_node = generator_linear_graphs(year)
        while True:
            mastered = play_topic_node(topic_node)
            print("Options: [R]eplay Node, [N]ext Year, [Q]uit")
            choice = input("Choose: ").strip().lower()
            if choice == 'r':
                continue
            elif choice == 'n':
                print("Year progression not implemented in MVP. Returning to year selection.\n")
                break
            elif choice == 'q':
                print("Thanks for playing EduQuest!")
                return
            else:
                print("Invalid choice. Try again.")

if __name__ == "__main__":
    main() 