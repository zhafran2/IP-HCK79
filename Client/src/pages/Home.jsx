import { useState, useRef, useEffect } from "react";
import axios from "../AXIOS/axiosinstance";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // Menyimpan percakapan
  const [isChatOpen, setIsChatOpen] = useState(false); // Untuk menampilkan modal chatbot
  const chatRef = useRef(null);

  // Fungsi untuk mengirim pertanyaan ke AI
  async function geminiAI(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setQuestion("");

    try {
      const { data } = await axios({
        method: "POST",
        url: "/quiz/gemini",
        data: { question },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (data.answer) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Maaf, saya tidak tahu jawabannya." },
        ]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Terjadi kesalahan!",
      });
    }
  }

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => setMessages([]);

  return (
    <>
      {/* Wrapper untuk tombol Play dan Settings */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        {/* Tombol Play */}
        <button
          onClick={() => navigate("/play")}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#28a745",
            color: "white",
            marginBottom: "15px",
            width: "200px",
            textAlign: "center",
          }}
        >
          <Link to={"/play"}>🎮 Play</Link>
        </button>

        {/* Tombol Settings */}
        <button
          onClick={() => navigate("/settings")}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#312E81",
            color: "white",
            width: "200px",
            textAlign: "center",
          }}
        >
        ⚙️ Settings
        </button>
        <button
          onClick={() => navigate("/play/api")}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "maroon",
            color: "white",
            width: "200px",
            textAlign: "center",
            marginTop:"10px"
          }}
        >
        🎯 Play Api Quiz
        </button>
      </div>

      {/* Tombol Chat AI di Pojok Halaman */}
      <button
        onClick={() => setIsChatOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "50%",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        💬
      </button>

      {/* Modal Chatbot */}
      {isChatOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999",
          }}
        >
          <div
            style={{
              width: "500px",
              maxWidth: "90%",
              height: "80%",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header Modal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "18px" }}>Chat dengan AI</h3>
              <div>
                <button
                  onClick={clearChat}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    marginRight: "10px",
                    color: "#dc3545",
                  }}
                >
                  🗑️
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </div>
            </div>

            {/* Tampilan Percakapan */}
            <div
              style={{
                flex: "1",
                overflowY: "auto",
                padding: "10px",
                background: "#f8f9fa",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {messages.length === 0 ? (
                <p style={{ textAlign: "center", color: "#888" }}>
                  Mulai percakapan dengan AI!
                </p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.sender === "user" ? "flex-end" : "flex-start",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "10px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        backgroundColor:
                          msg.sender === "user" ? "#007bff" : "#28a745",
                        color: "white",
                        textAlign: "left",
                        wordWrap: "break-word",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatRef} />
            </div>

            {/* Form Input */}
            <form
              onSubmit={geminiAI}
              style={{
                display: "flex",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ketik pertanyaan..."
                required
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              />
              <button type="submit" style={{ marginLeft: "5px",color:"blue" }}>➤</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
