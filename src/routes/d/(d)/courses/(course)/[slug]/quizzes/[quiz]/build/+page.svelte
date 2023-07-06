<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "$lib/stores/stores.js";
	import {Button, Checkbox, Input, Label, Select, Textarea} from "flowbite-svelte";
	import {writable} from "svelte/store";

	let model;
	export let data;
	let course_data = data.courseData;


	interface Quiz {
		title: string;
		instructions: string;
		totalPoints: number;
		questions: Question[];
	}

	interface Question {
		type: string;
		question: string;
		points: number;
		choices?: string[];
		correctAnswer?: number;
		selectedAnswers?: boolean[];
	}

	class QuizBuilder {
		quiz: Quiz = {
			title: "",
			instructions: "",
			totalPoints: 0,
			questions: [],
		};

		currentQuestion: Question = {
			type: "",
			question: "",
			points: 0,
			choices: [],
		};

		currentChoice = "";

		addQuestion(): void {
			this.quiz.questions.push(this.currentQuestion);
			this.currentQuestion = {
				type: "",
				question: "",
				points: 0,
				choices: [],
			};
		}

		addChoice(): void {
			this.currentQuestion.choices?.push(this.currentChoice);

			if (this.currentQuestion.type === 'multiple-choice') {
				if (!this.currentQuestion.selectedAnswers) {
					this.currentQuestion.selectedAnswers = [];
				}

				this.currentQuestion.selectedAnswers.push(false);

				if (this.currentQuestion.choices.length === this.currentQuestion.correctAnswer + 1) {
					this.currentQuestion.selectedAnswers[this.currentQuestion.correctAnswer] = true;
				}
			}

			this.currentChoice = '';
		}
	}



	const createQuizBuilder = () => {
		const { subscribe, update, set } = writable<QuizBuilder>(new QuizBuilder());

		return {
			subscribe,
			set,
			addQuestion: () => {
				update(builder => {
					builder.addQuestion();
					return builder;
				});
			},
			addChoice: () => {
				update(builder => {
					builder.addChoice();
					return builder;
				});
			}
		};
	};

	let quizBuilder;


	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');

		//quizBuilder = new QuizBuilder();
		quizBuilder = createQuizBuilder();
	});
</script>

<div class="w-full">
	<section class="p-1 mt-4">
			<div class="container mx-12 my-5">
				<div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">
					{#if quizBuilder}
					<main class="w-2/3 mx-auto p-4">
						<h1 class="text-2xl font-bold mb-4">Quiz Builder</h1>

						<div class="mb-4">
							<Label class="block mb-2">Title:</Label>
								<Input class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.quiz.title} type="text"/>

							<Label class="block mb-2">Instructions:</Label>
							   <Textarea class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.quiz.instructions}/>

							<Label class="block mb-2">Total Points:</Label>
								<Input class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.quiz.totalPoints} type="number"/>
						</div>
						<hr>
						<h2 class="text-lg font-bold mb-4 mt-2">Create a Question</h2>

						<div class="mb-4">
							<Label class="block mb-2">Question Type:</Label>
								<Select class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.currentQuestion.type}>
									<option value="multiple-choice">Multiple Choice</option>
									<option value="interactive-code">Interactive Code</option>
									<option value="short-answer">Short Answer / Essay</option>
								</Select>


							<Label class="block mb-2">Question Prompt:</Label>
								<Textarea class="border border-gray-300 p-2 mt-1 w-full" bind:value={$quizBuilder.currentQuestion.question}></Textarea>

							<Label class="block mb-2">Points:</Label>
								<Input class="border border-gray-300 p-2 mt-1 w-full mb-4" bind:value={$quizBuilder.currentQuestion.points} type="number"/>

							{#if $quizBuilder.currentQuestion.type === 'multiple-choice'}
								<h3 class="text-lg font-bold mb-2">Choices</h3>
								<ul class="list-disc pl-4 mb-4">
									{#key $quizBuilder.currentQuestion.choices}
									{#each $quizBuilder.currentQuestion.choices as answer, index}
										<li>
												<Checkbox  bind:checked={$quizBuilder.currentQuestion.selectedAnswers[index]}/>
												<span class="ml-2">{answer}</span>
										</li>
									{/each}
									{/key}
								</ul>
								<div class="flex mb-2">
									<Input class="border border-gray-300 " bind:value={$quizBuilder.currentChoice} type="text"/>
									<button class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded" on:click={quizBuilder.addChoice}>Add</button>
								</div>
							{/if}

							<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" on:click={() => quizBuilder.addQuestion()}>Add Question</button>
						</div>

						<h2 class="text-lg font-bold">Generated JSON Object:</h2>
						{#key $quizBuilder}
						<pre class="border border-gray-300 p-4 mt-4 rounded">{JSON.stringify($quizBuilder, null, 2)}</pre>
							{/key}
					</main>
						{/if}
				</div>
			</div>
	</section>
</div>

