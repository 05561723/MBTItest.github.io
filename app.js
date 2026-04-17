// 初始化分数（四个维度平衡分布，每题权重相同）
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// 25题题库（每个维度6-7题，提升结果准确性）
const questions = [
  // 维度1：E（外向）/I（内向）—— 7题
  { dimension: 'E/I', text: '1. 你周末更倾向于', options: [{ text: '参加聚会或户外活动', value: 'E' }, { text: '在家看书或独处', value: 'I' }] },
  { dimension: 'E/I', text: '2. 你解决问题时更依赖', options: [{ text: '和他人讨论想法', value: 'E' }, { text: '独自思考分析', value: 'I' }] },
  { dimension: 'E/I', text: '3. 你认为“有趣的社交”是', options: [{ text: '认识新朋友、拓展圈子', value: 'E' }, { text: '和知己深入交流', value: 'I' }] },
  { dimension: 'E/I', text: '4. 长时间独处后，你会感到', options: [{ text: '无聊，想找人互动', value: 'E' }, { text: '平静，甚至享受', value: 'I' }] },
  { dimension: 'E/I', text: '5. 你在团队中更擅长', options: [{ text: '带动气氛、协调关系', value: 'E' }, { text: '专注细节、默默执行', value: 'I' }] },
  { dimension: 'E/I', text: '6. 你更愿意如何表达观点', options: [{ text: '口头讨论，即时反馈', value: 'E' }, { text: '书面文字，仔细斟酌', value: 'I' }] },
  { dimension: 'E/I', text: '7. 你对“热闹的环境”感受是', options: [{ text: '能激发活力', value: 'E' }, { text: '容易感到疲惫', value: 'I' }] },

  // 维度2：S（感觉）/N（直觉）—— 6题
  { dimension: 'S/N', text: '8. 你记东西时更擅长记住', options: [{ text: '具体数字、事实', value: 'S' }, { text: '整体印象、关联意义', value: 'N' }] },
  { dimension: 'S/N', text: '9. 你对“创新”的理解是', options: [{ text: '在现有基础上优化', value: 'S' }, { text: '提出全新的思路', value: 'N' }] },
  { dimension: 'S/N', text: '10. 你看电影时更关注', options: [{ text: '剧情逻辑、细节合理性', value: 'S' }, { text: '主题寓意、情感共鸣', value: 'N' }] },
  { dimension: 'S/N', text: '11. 你做选择时更在意', options: [{ text: '当下的实际收益', value: 'S' }, { text: '长远的发展潜力', value: 'N' }] },
  { dimension: 'S/N', text: '12. 你学习时更喜欢', options: [{ text: '步骤清晰的教程', value: 'S' }, { text: '启发思考的案例', value: 'N' }] },
  { dimension: 'S/N', text: '13. 你对“抽象概念”的态度是', options: [{ text: '需要具体例子支撑', value: 'S' }, { text: '能快速理解并联想', value: 'N' }] },

  // 维度3：T（思考）/F（情感）—— 6题
  { dimension: 'T/F', text: '14. 你评价他人时更看重', options: [{ text: '能力和结果', value: 'T' }, { text: '态度和同理心', value: 'F' }] },
  { dimension: 'T/F', text: '15. 你拒绝他人时会', options: [{ text: '直接说明原因', value: 'T' }, { text: '先考虑对方感受', value: 'F' }] },
  { dimension: 'T/F', text: '16. 你认为“公正”是', options: [{ text: '规则面前人人平等', value: 'T' }, { text: '考虑个体差异的公平', value: 'F' }] },
  { dimension: 'T/F', text: '17. 你做决定时会优先', options: [{ text: '逻辑合理性', value: 'T' }, { text: '人际关系和谐', value: 'F' }] },
  { dimension: 'T/F', text: '18. 你对“批评”的接受度是', options: [{ text: '只要有理就认可', value: 'T' }, { text: '在意对方的语气', value: 'F' }] },
  { dimension: 'T/F', text: '19. 你解决冲突时更关注', options: [{ text: '找到最优解', value: 'T' }, { text: '让双方都满意', value: 'F' }] },

  // 维度4：J（判断）/P（知觉）—— 6题
  { dimension: 'J/P', text: '20. 你对“计划”的态度是', options: [{ text: '必须严格执行', value: 'J' }, { text: '可灵活调整', value: 'P' }] },
  { dimension: 'J/P', text: '21. 你更倾向于', options: [{ text: '提前完成任务', value: 'J' }, { text: '临近截止日期再做', value: 'P' }] },
  { dimension: 'J/P', text: '22. 你对“意外”的感受是', options: [{ text: '打乱节奏，感到不适', value: 'J' }, { text: '带来新鲜感', value: 'P' }] },
  { dimension: 'J/P', text: '23. 你整理物品时会', options: [{ text: '分类摆放，井井有条', value: 'J' }, { text: '随意放置，方便取用', value: 'P' }] },
  { dimension: 'J/P', text: '24. 你旅行时会', options: [{ text: '提前订好行程和酒店', value: 'J' }, { text: '到当地再临时安排', value: 'P' }] },
  { dimension: 'J/P', text: '25. 你更享受', options: [{ text: '完成计划的成就感', value: 'J' }, { text: '自由探索的过程', value: 'P' }] }
];

// 16种人格类型详细分析
const typeAnalysis = {
  'ISTJ': {
    summary: 'ISTJ被称为“检查官”，务实、可靠，重视规则和责任。他们做事严谨，善于管理细节，是团队中稳定的支柱。',
    strengths: '责任心强、有条理、注重实际、信守承诺',
    suitable: '会计、行政、工程、法律等需要细致和规范的领域'
  },
  'ISFJ': {
    summary: 'ISFJ被称为“守护者”，温和、体贴，善于照顾他人需求。他们重视和谐，默默付出，是人际关系的粘合剂。',
    strengths: '有同理心、耐心、忠诚、善于倾听',
    suitable: '护理、教育、社会工作、行政等需要关怀他人的领域'
  },
  'INFJ': {
    summary: 'INFJ被称为“咨询师”，富有洞察力和理想主义，追求深层意义。他们善于理解他人，能为他人提供指引。',
    strengths: '有远见、同理心强、坚定价值观、善于启发他人',
    suitable: '心理咨询、教育、艺术、公益等需要深度思考的领域'
  },
  'INTJ': {
    summary: 'INTJ被称为“战略家”，独立、果断，具有强大的逻辑和规划能力。他们擅长分析复杂问题，追求长远目标。',
    strengths: '战略思维、创新、自律、果断',
    suitable: '科研、管理、金融、技术研发等需要战略规划的领域'
  },
  'ISTP': {
    summary: 'ISTP被称为“手艺人”，务实、灵活，擅长解决实际问题。他们动手能力强，在危机中能保持冷静。',
    strengths: '适应性强、动手能力强、理性、冷静',
    suitable: '机械维修、技术支持、刑侦、运动等需要应变能力的领域'
  },
  'ISFP': {
    summary: 'ISFP被称为“艺术家”，敏感、灵活，注重个人体验和审美。他们用行动表达情感，不喜欢过多约束。',
    strengths: '观察力强、富有创造力、温和、注重当下',
    suitable: '艺术、设计、手工、护理等需要感官体验的领域'
  },
  'INFP': {
    summary: 'INFP被称为“调停者”，理想主义、真诚，重视个人价值观。他们富有创造力，为坚持信念不懈努力。',
    strengths: '同理心强、创造力、真诚、坚持理想',
    suitable: '写作、艺术、教育、公益等需要价值观驱动的领域'
  },
  'INTP': {
    summary: 'INTP被称为“逻辑学家”，理性、好奇，热衷于探索抽象概念。他们擅长逻辑推理，对知识有强烈求知欲。',
    strengths: '分析能力强、思维敏捷、创新、独立思考',
    suitable: '科研、编程、哲学、数学等需要深度思考的领域'
  },
  'ESTP': {
    summary: 'ESTP被称为“创业者”，外向、务实，喜欢行动和刺激。他们适应力强，能在实践中快速学习。',
    strengths: '行动力强、乐观、善于应变、社交能力强',
    suitable: '销售、创业、体育、娱乐等需要活力的领域'
  },
  'ESFP': {
    summary: 'ESFP被称为“表演者”，热情、开朗，善于活跃气氛。他们注重当下体验，能快速与他人建立联系。',
    strengths: '亲和力强、乐观、灵活、善于表达',
    suitable: '演艺、公关、旅游、教育等需要社交能力的领域'
  },
  'ENFP': {
    summary: 'ENFP被称为“追梦人”，热情、富有创造力，喜欢探索可能性。他们善于激励他人，看到事物积极面。',
    strengths: '创造力强、感染力强、好奇心重、善于沟通',
    suitable: '营销、教育、咨询、艺术等需要创意的领域'
  },
  'ENTP': {
    summary: 'ENTP被称为“辩论家”，机智、果断，喜欢挑战和创新。他们思维敏捷，善于发现问题并提出解决方案。',
    strengths: '逻辑清晰、创新、应变力强、善于辩论',
    suitable: '法律、创业、公关、科研等需要思辨的领域'
  },
  'ESTJ': {
    summary: 'ESTJ被称为“管理者”，果断、务实，重视规则和效率。他们善于组织协调，是天生的领导者。',
    strengths: '组织能力强、果断、负责、效率高',
    suitable: '管理、行政、军事、法律等需要统筹的领域'
  },
  'ESFJ': {
    summary: 'ESFJ被称为“东道主”，热情、友善，重视人际关系和谐。他们善于照顾他人，维护团队凝聚力。',
    strengths: '社交能力强、有责任心、善于协调、体贴',
    suitable: '教育、公关、客服、医疗等需要人际互动的领域'
  },
  'ENFJ': {
    summary: 'ENFJ被称为“教育家”，富有魅力、善于沟通，重视他人成长。他们能激励团队达成目标，是天生的领导者。',
    strengths: '感染力强、善于激励、有同理心、组织能力强',
    suitable: '教育、管理、咨询、公关等需要领导能力的领域'
  },
  'ENTJ': {
    summary: 'ENTJ被称为“指挥官”，自信、果断，具有强大的领导力和战略眼光。他们善于制定计划并推动执行。',
    strengths: '领导力强、战略思维、果断、效率高',
    suitable: '企业管理、政治、军事、项目管理等需要决策的领域'
  }
};

let currentQuestion = 0;

// 开始测试按钮事件（修复绑定逻辑）
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  showQuestion(currentQuestion); // 确保正确调用问题展示函数
});

// 显示当前问题（修复HTML模板语法错误）
function showQuestion(index) {
  // 更新进度条
  const progress = ((index + 1) / questions.length) * 100; // 进度计算修正
  document.getElementById('progressBar').style.width = `${progress}%`;

  const container = document.getElementById('questionContainer');
  const question = questions[index];
  // 修复HTML模板闭合标签
  container.innerHTML = `
    <div class="question-card">
      <h3>问题 ${index + 1}/25</h3>
      <p>${question.text}</p>
      ${question.options.map((opt, i) => `
        <button class="option-btn" 
          data-dimension="${question.dimension}"
          data-value="${opt.value}">
          ${String.fromCharCode(65 + i)}. ${opt.text}
        </button>
      `).join('')}
    </div>
  `;

  // 绑定选项按钮点击事件
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.value;
      scores[value]++; // 累加对应维度分数
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion(currentQuestion); // 下一题
      } else {
        showResult(); // 显示结果
      }
    });
  });
}

// 显示测试结果（补充完整逻辑）
function showResult() {
  // 计算人格类型
  const resultType = 
    (scores.E > scores.I? 'E' : 'I') +
    (scores.S > scores.N? 'S' : 'N') +
    (scores.T > scores.F? 'T' : 'F') +
    (scores.J > scores.P? 'J' : 'P');

  // 显示维度详情
  const dimensionDetail = `
    <p><strong>维度倾向：</strong></p>
    <p>外向(E) ${scores.E} : ${scores.I} 内向(I)</p>
    <p>感觉(S) ${scores.S} : ${scores.N} 直觉(N)</p>
    <p>思考(T) ${scores.T} : ${scores.F} 情感(F)</p>
    <p>判断(J) ${scores.J} : ${scores.P} 知觉(P)</p>
  `;

  // 显示分析结果
  const analysis = typeAnalysis[resultType];
  const resultContent = `
    <p><strong>核心特质：</strong>${analysis.summary}</p>
    <p><strong>优势：</strong>${analysis.strengths}</p>
    <p><strong>适合领域：</strong>${analysis.suitable}</p>
  `;

  // 更新页面
  document.getElementById('resultType').textContent = resultType;
  document.getElementById('dimensionDetail').innerHTML = dimensionDetail;
  document.getElementById('resultAnalysis').innerHTML = resultContent;
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('result').style.display = 'block';
}