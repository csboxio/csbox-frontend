<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "$lib/stores/stores.js";
	import {Button, Checkbox, Input, Label, Select, Textarea} from "flowbite-svelte";
	import {writable} from "svelte/store";
	import {browser} from "$app/environment";

	let model;
	export let data;

	let { supabase, params, quiz_data } = data
	$: ({ supabase, params, quiz_data } = data)

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
			selectedAnswers: []
		};

		currentChoice = "";

		addQuestion(): void {
			this.quiz.questions.push(this.currentQuestion);
			this.currentQuestion = {
				type: "",
				question: "",
				points: 0,
				choices: [],
				selectedAnswers: [],
			};
			this.updateTotalPoints()
		}

		removeQuestion(index: number): void {
			this.quiz.questions.splice(index, 1);
			this.updateTotalPoints();
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
			this.updateTotalPoints()
		}

		updateTotalPoints(): void {
			let totalPoints = 0;
			this.quiz.questions.forEach((question) => {
				totalPoints += parseInt(String(question.points));
			});
			this.quiz.totalPoints = totalPoints;
		}

		editQuestion(questionIndex: number): void {
			const selectedQuestion = this.quiz.questions[questionIndex];
			const selectedAnswers = selectedQuestion.selectedAnswers || [];
			this.currentQuestion = {
				...selectedQuestion,
				selectedAnswers: [...selectedAnswers]
			};
			this.quiz.questions.splice(questionIndex, 1);
		}

		async save(): Promise<void> {
			const updates = {
				quiz_doc: $quizBuilder.quiz
			}

			console.log(params)

			const {error} = await supabase.from('quizzes').update(updates)
					.eq('course_id', params.slug)
					.eq('id', params.quiz)

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
			removeQuestion: () => {
				update(builder => {
					builder.removeQuestion();
					return builder;
				});
			},
			addChoice: () => {
				update(builder => {
					builder.addChoice();
					return builder;
				});
			},
			editQuestion: (questionIndex: number) => {
				update(builder => {
					builder.editQuestion(questionIndex);
					return builder;
				});
			},
			save: () => {
				update(builder => {
					builder.save();
					return builder;
				});
			}
		};
	};

	let quizBuilder;
	let quizChanged
	$: quizChanged = false;

	onMount(() => {
		// Set the selected item when the page is mounted
		navStore.set('courses');

		//quizBuilder = new QuizBuilder();



	});
	quizBuilder = createQuizBuilder();
	/** @type {import('./$types').Snapshot<string>} */
	export const snapshot = {
		capture: () => $quizBuilder.quiz,
		restore: (value) => $quizBuilder.quiz = value


	};

	if (quiz_data.quiz_doc != null) {
		$quizBuilder.quiz = quiz_data.quiz_doc
	}

	$: {
		if (JSON.stringify($quizBuilder.quiz) != JSON.stringify(quiz_data.quiz_doc))
		{

			quizChanged = true;
			console.log(quizChanged)
			console.log($quizBuilder.quiz, quiz_data.quiz_doc)
		}
	}

</script>

<div class="w-full">
	<section class="p-1 mt-4">
			<div class="container mx-12 my-5">
				<div class="flex flex-wrap gap-4 mb-6 -mx-10 -mb-6 text-white font-semibold">
					{#if quizBuilder}
						<div class=" md:w-1/2 px-10">
							<div class="mb-4">
							<h1 class="text-xl font-bold mb-3 ">Quiz Builder</h1>

								<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
										font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-green-300
										group-hover:from-blue-300 group-hover:to-green-500 hover:text-white dark:text-white
										focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
											on:click={() => quizBuilder.save()}>
									<span class="relative px-2 py-2 transition-all|local ease-in duration-75 bg-white
									dark:{quizChanged ? 'bg-green-500' : 'bg-gray-600'} rounded-md group-hover:bg-opacity-0">
										Save
									</span>
								</button>




							<Label class="block mb-2">Title:</Label>
								<Input class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.quiz.title} type="text"/>

							<Label class="block mb-2">Instructions:</Label>
							   <Textarea class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.quiz.instructions}/>

							<Label class="block mb-2">Total Points:</Label>
								<Input class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.quiz.totalPoints} type="number"/>
						</div>
							<hr>
							<div class="mb-4">
							<h2 class="text-lg font-bold mb-4 mt-4">Question Builder</h2>
							<Label class="block mb-2">Question Type:</Label>
								<select class="block text-gray-900 bg-gray-50 rounded-lg focus:ring-primary-500 focus:border-primary-500
								 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
								  dark:focus:border-primary-500 text-sm border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.currentQuestion.type}>
									<option selected value="multiple-choice">Multiple Choice</option>
									<!--<option value="interactive-code">Interactive Code</option>-->
									<option value="short-answer">Short Answer / Essay</option>
								</select>


							<Label class="block mb-2">Question Prompt:</Label>
								<Textarea class="border border-gray-300 p-2 mt-1 w-full" bind:value={$quizBuilder.currentQuestion.question}></Textarea>

							<Label class="block mb-2">Points:</Label>
								<Input class="border border-gray-300 p-2 mt-1 w-full mb-4" bind:value={$quizBuilder.currentQuestion.points} type="number"/>

							{#if $quizBuilder.currentQuestion.type === 'multiple-choice'}
								<h3 class="text-lg font-bold mb-2">Choices</h3>
								<ul class="list-disc pl-4 mb-4 list-none">
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
						</div>

						<div class="flex flex-grow px-6">
							<div class="w-full">
							<h2 class="text-xl font-bold mb-4">Questions:</h2>
							{#key $quizBuilder}
								{#each $quizBuilder.quiz.questions as question, i}
									<div class="bg-gray-500 p-4 my-4 rounded ">
										<h3 class="text-xl font-bold mb-2">{question.question} : {question.points}</h3>

										{#if question.type === 'multiple-choice'}
											<ul class="list-disc pl-4 list-none">
												{#each question.choices as choice, index}
													<li class="{question.selectedAnswers[index] ? 'text-green-500 font-semibold' : ''}">{choice}</li>
												{/each}
											</ul>
										{/if}
										<!-- Edit button-->
										<button class=" bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mt-1" on:click={() => quizBuilder.editQuestion(i)}>Edit</button>
										<button class=" bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mt-1" on:click={() => quizBuilder.removeQuestion(i)}>Delete</button>

									</div>

								{/each}
								<!--<pre class="border border-gray-300 p-4 mt-4 rounded">{JSON.stringify($quizBuilder, null, 2)}</pre>-->
							{/key}
						</div>
						</div>

					{/if}
				</div>

			</div>

	</section>

</div>

