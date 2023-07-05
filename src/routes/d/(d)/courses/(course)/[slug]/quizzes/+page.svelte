<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "../../../../../../../lib/stores/stores.js";
	import {Input, Label} from "flowbite-svelte";

	let model;
	export let data;
	let course_data = data.courseData;


	const questions = [
		{
			question: 'What is the output of the following code?',
			code: 'console.log(2 + 2);',
			options: ['2', '4', '22', 'NaN'],
			answer: '4',
			selectedOption: ''
		},
		{
			question: 'What does CSS stand for?',
			options: ['Cascading Style Sheets', 'Creative Style Selector', 'Computer Style System', 'None of the above'],
			answer: 'Cascading Style Sheets',
			selectedOption: ''
		},
		{
			question: 'Which programming language is commonly used for web development?',
			options: ['JavaScript', 'Python', 'Java', 'C++'],
			answer: 'JavaScript',
			selectedOption: ''
		},
	];

	let currentQuestion = 0;
	let score = 0;
	let quizCompleted = false;
	let quizScoreOutput = ""

	function nextQuestion() {
		if (currentQuestion < questions.length - 1) {
			currentQuestion++;
		}
		else {
			quizCompleted = true;
			showScore();
		}
	}

	function checkAnswer() {
		const { answer, selectedOption } = questions[currentQuestion];
		if (selectedOption === answer) {
			score++;
		}
		nextQuestion();
	}

	function showScore() {
		const percentage = (score / questions.length) * 100;
		quizScoreOutput = `Quiz completed! Your score is ${percentage}`;
	}

	function resetQuiz() {
		currentQuestion = 0;
		score = 0;
		questions.forEach(question => {
			question.selectedOption = '';
		});
	}

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');
		// Reset quiz state when the component mounts
		resetQuiz();
	});
</script>

<div class="flex flex-row">
	<section class="p-1 mt-4">
		<div class="container mx-12 my-5">
			<div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">
				{#if quizCompleted}
					<p>{quizScoreOutput}</p>
				{:else}
				{#if questions[currentQuestion]}
					<div class="p-4 bg-gray-700 rounded-lg">
						<h2 class="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
						{#if questions[currentQuestion].code}
							<pre class="text-white bg-gray-900 rounded-md p-4">{questions[currentQuestion].code}</pre>
						{/if}
						<ul class="space-y-2">
							{#each questions[currentQuestion].options as option}
								<li>
									<label class="flex items-center">
										<input
												type="radio"
												name="option"
												value={option}
												bind:group={questions[currentQuestion].selectedOption}
												class="mr-2"
										/>
										{option}
									</label>
								</li>
							{/each}
						</ul>
						<button class="bg-blue-500 text-white px-4 py-2 rounded-lg" on:click={checkAnswer}>
							{currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
						</button>
					</div>
				{:else}
					<p>No more questions!</p>
				{/if}
				{/if}
			</div>
		</div>
	</section>
</div>
