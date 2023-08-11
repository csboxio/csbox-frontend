<script lang="ts">
	import {onMount} from "svelte";
	import {navStore} from "$lib/stores/stores.js";
	import {
		Button,
		Checkbox,
		Input,
		Label,
		Select,
		Table,
		TableBody, TableBodyCell, TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea
	} from "flowbite-svelte";
	import {writable} from "svelte/store";
	import {browser} from "$app/environment";
	import {DateInput} from "date-picker-svelte";

	export let data;

	let { supabase, params, quiz_data, courses, claim } = data
	$: ({ supabase, params, quiz_data, courses, claim } = data)

	let course_data = data.courseData;

	let _quiz;
	$: _quiz = quiz_data

	console.log(quiz_data)


	interface Quiz {
		title: string;
		instructions: string;
		totalPoints: number;
		dueDate: Date;
		availableForm: Date;
		availableTo: Date;
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
			dueDate: new Date(),
			availableForm: new Date(),
			availableTo: new Date(),
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
			if (this.quiz.questions) {
				this.quiz.questions.push(this.currentQuestion);
			}
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
			if (this.quiz.questions) {
			this.quiz.questions.forEach((question) => {
				totalPoints += parseInt(String(question.points));
			});
			this.quiz.totalPoints = totalPoints;
			}
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
				quiz_doc: $quizBuilder.quiz,
				due: currentDate,
				availableFrom: availableFrom,
				availableTo: availableTo,
				quiz_attempts: quiz_data.quiz_attempts,
				password: quiz_data.password
			}

			console.log(updates)

			const {error} = await supabase.from('quizzes').update(updates)
					.eq('course_id', params.slug)
					.eq('id', params.quiz)

			console.log(error)

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
		setActiveTab('Course')

		if (claim == 'student') {
			history.back()
		}
	});
	quizBuilder = createQuizBuilder();
	/** @type {import('./$types').Snapshot<string>} */
	export const snapshot = {
		capture: () => $quizBuilder.quiz,
		restore: (value) => $quizBuilder.quiz = value


	};

	if (quiz_data.quiz_doc != null) {
		// HOLY
		const newQuizData = quiz_data.quiz_doc;
		$quizBuilder.quiz = { ...$quizBuilder.quiz, ...newQuizData };
	}

	$: {
		if (JSON.stringify($quizBuilder.quiz) != JSON.stringify(quiz_data.quiz_doc))
		{

			quizChanged = true;
		}
	}

	let activeTab = 'profile';

	function setActiveTab(tab) {
		activeTab = tab;
	}

	let currentDate = quiz_data.quiz_doc.dueDate ? new Date(quiz_data.quiz_doc.dueDate) : new Date();
	let availableFrom = quiz_data.quiz_doc.availableFrom ? new Date(quiz_data.quiz_doc.availableFrom) : new Date();
	let availableTo = quiz_data.quiz_doc.availableTo ? new Date(quiz_data.quiz_doc.availableTo) : new Date();

	$: {
		$quizBuilder.quiz.dueDate = currentDate;
		$quizBuilder.quiz.availableFrom = availableFrom;
		$quizBuilder.quiz.availableTo = availableTo;
	}
</script>

<style>
	:global(body) {

		--date-picker-foreground: #ffffff;
		--date-picker-background: #1a202d;
		--date-picker-highlight-border: hsl(var(--deg), 98%, 49%);
		--date-picker-highlight-shadow: hsla(var(--deg), 98%, 49%, 50%);
		--date-picker-selected-color: hsl(var(--deg), 100%, 85%);
		--date-picker-selected-background: hsla(var(--deg), 98%, 49%, 20%);
		background: #151a24;
		color-scheme: dark;
		color: #ffffff;
		transition: all 80ms ease-in-out;
	}
	#DatePicker {
		margin-top: 10px;
		margin-left: 5px;
	}
	.active {
		border-color: gray;
	}

	.inactive {
		border-color: transparent;
	}
</style>


<div class="w-full">
	<section class="p-1 mt-4">
			<div class="container mx-12 my-5">
				<div class="flex flex-wrap gap-4 mb-6 -mx-10 -mb-6 text-white font-semibold">
					{#if quizBuilder && claim !== 'student'}
						<div class=" md:w-1/2 ">
							<div class="mb-4">
							<h1 class="text-xl font-bold mb-3 ">Create New Quiz</h1>

								<!-- SAVE BUTTON -->

								<button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
									font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
									group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
									focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
										on:click={() => quizBuilder.save()}>
									<span class="relative px-4 py-2 transition-all|local ease-in duration-75 bg-white
									dark:{quizChanged ? 'bg-blue-600' : 'bg-gray-600'} rounded-md group-hover:bg-opacity-0">
										Save
									</span>
								</button>

								<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
									<ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" role="tablist">
										<li class="mr-2" role="presentation">
											<button class="inline-block p-4 border-b-2 rounded-t-lg {activeTab === 'Course' ? 'active' : 'inactive'}"
													on:click={() => setActiveTab('Course')} type="button" role="tab" aria-controls="profile"
													aria-selected={activeTab === 'Course'}>Course</button>
										</li>
										<li class="mr-2" role="presentation">
											<button class="inline-block p-4 border-b-2 rounded-t-lg {activeTab === 'Basic Information' ? 'active' : 'inactive'}"
													on:click={() => setActiveTab('Basic Information')} type="button" role="tab" aria-controls="settings"
													aria-selected={activeTab === 'Basic Information'}>Basic Information</button>
										</li>
										<li role="presentation">
											<button class="inline-block p-4 border-b-2 rounded-t-lg {activeTab === 'Settings' ? 'active' : 'inactive'}"
													on:click={() => setActiveTab('Settings')} type="button" role="tab" aria-controls="contacts"
													aria-selected={activeTab === 'Settings'}>Settings</button>
										</li>
										<li role="presentation">
											<button class="inline-block p-4 border-b-2 rounded-t-lg {activeTab === 'Questions' ? 'active' : 'inactive'}"
													on:click={() => setActiveTab('Questions')} type="button" role="tab" aria-controls="contacts"
													aria-selected={activeTab === 'Questions'}>Questions</button>
										</li>
									</ul>
								</div>

								<div id="myTabContent">
									{#if activeTab === 'Course'}
										<div class="text-lg mb-2">Select course(s) to add quiz.</div>
										<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="profile-tab">
											<Table hoverable>
												<TableBody class="divide-y">
													{#key courses.data}
														{#each courses.data as { id, course_title, inserted_at}, i}
															<TableBodyRow  class="cursor-pointer">
																<TableBodyCell >{id ? id : 'No id'}</TableBodyCell>
																<TableBodyCell >{course_title ? course_title : 'No title'}</TableBodyCell>
																<TableBodyCell >{inserted_at ? inserted_at.substring(0,10) : 'No created'}</TableBodyCell>

																<TableBodyCell tdClass="py-4 whitespace-nowrap font-medium"  >
																	{#if id != params.slug}
																	<Checkbox disabled></Checkbox>
																		{:else}
																		<Checkbox checked disabled></Checkbox>
																	{/if}
																</TableBodyCell>
															</TableBodyRow>
														{/each}
													{/key}
												</TableBody>
											</Table>
										</div>
									{/if}

									{#if activeTab === 'Basic Information'}
										<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="settings-tab">
											<Label class="block mb-2">Title:</Label>
											<Input class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.quiz.title} type="text"/>

											<Label class="block mb-2">Instructions:</Label>
											<Textarea class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.quiz.instructions}/>

											<Label class="block mb-2">Total Points:</Label>
											<Input class="border border-gray-300 p-2 mt-1 w-full mb-2" disabled bind:value={$quizBuilder.quiz.totalPoints} type="number"/>
										</div>
									{/if}

									{#if activeTab === 'Settings'}
										<div class="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="contacts-tab">
											<div>
												<Label class="block mb-2">Attempts:</Label>
												<Input class="border border-gray-300 p-2 mt-1 mb-2 " bind:value={quiz_data.quiz_attempts} type="number"/>
											</div>

											<div>
												<Label class="block mb-2">Password:</Label>
												<Input class="border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={quiz_data.password} />
											</div>

											<div>
												<Label class="block mb-2">Due:</Label>
												<DateInput class="mb-2" bind:value={currentDate}/>
											</div>
											<div>
												<Label class="block mb-2">Available from:</Label>
												<DateInput class="mb-2" bind:value={availableTo}/>
											</div>

											<div>
												<Label class="block mb-2">Available to:</Label>
												<DateInput class="mb-2" bind:value={availableFrom}/>
											</div>
										</div>
									{/if}

									{#if activeTab === 'Questions'}
										<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="contacts-tab">
											<div class="flex flex-grow px-6">
												<div class="w-full">
													<div class="mb-4">
														<h2 class="text-lg font-bold mb-4 mt-4">Question Builder</h2>
														<Label class="block mb-2">Type:</Label>
														<select class="block text-gray-900 bg-gray-50 rounded-lg focus:ring-primary-500 focus:border-primary-500
								 							dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
								  							dark:focus:border-primary-500 text-sm border border-gray-300 p-2 mt-1 w-full mb-2" bind:value={$quizBuilder.currentQuestion.type}>
															<option selected value="multiple-choice">Multiple Choice</option>
															<option value="short-answer">Short Answer / Essay</option>
														</select>
														<Label class="block mb-2">Prompt:</Label>
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

													{#key $quizBuilder}
														{#each $quizBuilder.quiz.questions as question, i}
															<div class="bg-gray-500 p-4 my-4 rounded relative">
																	<div class="absolute top-0 right-0 m-2 text-red-300 hover:text-red-500 hover:scale-110 cursor-pointer"
																		 on:click={() => quizBuilder.removeQuestion(i)}>
																	<svg aria-hidden="true"
																		 class="w-5 h-5"
																		 fill="currentColor"
																		 viewBox="0 0 20 20"
																		 xmlns="http://www.w3.org/2000/svg">
																		<path fill-rule="evenodd"
																			  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
																			  clip-rule="evenodd"/>
																	</svg>

																</div>
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

															</div>
														{/each}
														<!--<pre class="border border-gray-300 p-4 mt-4 rounded">{JSON.stringify($quizBuilder, null, 2)}</pre>-->
													{/key}
												</div>

											</div>

										</div>
									{/if}

								</div>
							</div>
						</div>

					{/if}
				</div>
			</div>
	</section>
</div>





