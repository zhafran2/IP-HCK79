const { Quiz, Category } = require("../models");

const axios = require("axios");
class QuizController {
  static async getAllQuestions(req, res, next) {
    try {
      const data = await Quiz.findAll();
      // console.log(data,"AAAAAAAAAAAAAAAAAAAA");

      res.status(200).json(data);

      // coba buat pertanyaan nya random. bukan hanya dari database
    } catch (error) {
      // console.log(error, "AAAAA");

      next(error);
    }
  }
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Quiz.findByPk({
        where: {
          id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async createQuestions(req, res, next) {
    try {
      const { question, option1, option2, option3, option4, ans, categoryId } =
        req.body;
      const data = await Quiz.create({
        question,
        option1,
        option2,
        option3,
        option4,
        ans,
        categoryId,
        userId: req.user.id,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async editQuestions(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Quiz.findByPk(id);
      const { question, option1, option2, option3, option4, ans, categoryId } =
        req.body;

      await data.update(
        {
          question,
          option1,
          option2,
          option3,
          option4,
          ans,
          categoryId,
          userId: req.user.id,
        },
        {
          where: {
            id,
          },
        }
      );
      if (!data) {
        throw { name: "Question is not found" };
      }
      res.status(200).json({
        message: `question has been updated`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteQuestions(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Quiz.findByPk(id);
      await data.destroy({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "notFound" };
      }
      res.status(200).json({
        message: "Question is already deleted",
      });
    } catch (error) {
      next(error);
    }
  }
  static async AiQuestions(req, res, next) {
    try {
      const { question } = req.body;
      if (!question) {
        return res
          .status(400)
          .json({ error: "Pertanyaan tidak boleh kosong!" });
      }

      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Prompt yang lebih spesifik dan memastikan format jawaban JSON
      const prompt = `Ketika dikasih: "${question}".jawab dengan lucu.
        Format response dalam JSON:
       
        {
            "answer": "Jawaban AI yang lucu seperti Raditya dika ngejokes"
        }
    
            And please make the response with json format. Create without \`\`\`json and \`\`\``;

      const result = await model.generateContent(prompt);

      // Periksa apakah hasilnya ada dan tidak kosong
      if (!result || !result.response) {
        throw new Error("AI tidak mengembalikan jawaban");
      }

      const text = result.response.text().trim();
      console.log("AI Raw Response:", text); // Debugging

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(text);
      } catch (jsonError) {
        console.error("Error parsing AI response:", jsonError);
        return res.status(500).json({ error: "Format jawaban AI tidak valid" });
      }

      res.status(200).json(parsedResponse);
    } catch (error) {
      // console.log(error, "INI AI");
      console.log(error, "AAAA");
      res
        .status(503)
        .json({ name: "GeminiError", message: "Maaf, Gemini sedang error" });
    }
  }

  static async QuizAPIIo(req, res, next) {
    try {
      const Quiz_API_URL = "https://quizapi.io/api/v1/questions";
        const Quiz_API = process.env.QUIZ_API;
        const { category, difficulty = "medium", limit = 10, tags } = req.query;

        const response = await axios.get(Quiz_API_URL, {
            params: {
                apiKey: Quiz_API,
                category,
                difficulty,
                limit,
                tags,
            },
        });

        // Transform the response
        const transformedQuizzes = response.data.map((quiz) => ({
            id: quiz.id,
            question: quiz.question,
            option1: quiz.answers.answer_a,
            option2: quiz.answers.answer_b,
            option3: quiz.answers.answer_c,
            option4: quiz.answers.answer_d,
            ans: Object.entries(quiz.correct_answers)
                .find(([key, value]) => value === "true") // Temukan jawaban yang benar
                ? Object.entries(quiz.answers).findIndex(([key, value]) =>
                      key.includes(
                          Object.entries(quiz.correct_answers)
                              .find(([key, value]) => value === "true")[0]
                              .replace("_correct", "")
                      )
                  ) + 1
                : null,
        }));

        res.status(200).json({
            data: transformedQuizzes,
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QuizController;
