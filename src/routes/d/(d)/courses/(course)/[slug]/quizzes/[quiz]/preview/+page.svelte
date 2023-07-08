<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "$lib/stores/stores.js";
	import {Button, Checkbox, Input, Label, Select, Textarea} from "flowbite-svelte";
	import {writable} from "svelte/store";

	let model;
	export let data;

	let { supabase, params, quiz_data } = data
	$: ({ supabase, params, quiz_data } = data)

	let course_data = data.courseData;

	let quizCompleted = false;
	let quizScoreOutput = "";
	let currentQuestion = 0;
	let score = 0;

	let questions
	$: questions = quiz_data.quiz_doc.questions;


	function nextQuestion() {
		if (currentQuestion < questions.length - 1) {
			currentQuestion++;
		} else {
			quizCompleted = true;
			showScore();
		}
	}

	function checkAnswer() {
		const selectedAnswers = questions[currentQuestion].selectedAnswers;

		if (selectedAnswers.every(answer => answer)) {
			score++;
		}

		nextQuestion();
	}

	function showScore() {
		const percentage = (score / questions.length) * 100;
		quizScoreOutput = `Quiz completed! Your score is ${percentage.toFixed(2)}%`;
	}

	function resetQuiz() {
		currentQuestion = 0;
		score = 0;
		questions.forEach(question => {
			question.selectedAnswers = question.choices.map(() => false);
		});
	}
</script>

<div class="w-full">
	<section class="p-1 mt-4">
		<div class="container mx-12 my-5">
			<div class="flex flex-wrap gap-4 mb-6 -mx-10 -mb-6 text-white font-semibold">
				<div class="flex flex-wrap -mb-6 text-white font-semibold">
					{#if questions}
					{#if !quizCompleted && questions.length > 0 && questions[currentQuestion]}
						<div class="p-4 bg-gray-700 rounded-lg">
							<h2 class="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
							{#if questions[currentQuestion].type === "multiple-choice"}
								<ul class="space-y-2">
									{#each questions[currentQuestion].choices as choice, index}
										<li>
											<label class="flex items-center">
												<input
														type="checkbox"
														bind:checked={questions[currentQuestion].selectedAnswers[index]}
														class="mr-2"
												/>
												{choice}
											</label>
										</li>
									{/each}
								</ul>
							{/if}
							<button class="bg-blue-500 text-white px-4 py-2 rounded-lg" on:click={checkAnswer}>
								{currentQuestion < questions.length - 1 ? "Next" : "Finish"}
							</button>
						</div>
					{:else if quizCompleted}
						<p>{quizScoreOutput}</p>
					{:else}
						<p>No more questions!</p>
					{/if}
						{/if}
				</div>
			</div>
		</div>
	</section>
</div>