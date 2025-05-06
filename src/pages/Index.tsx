import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Моковые данные для учителей-волонтеров
const teachersData = [
  {
    id: 1,
    name: "Анна Смирнова",
    grade: "11А",
    subjects: ["Английский язык"],
    experience: "2 года",
    rating: 4.8,
    availability: "Пн, Ср, Пт после 15:00",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    name: "Иван Петров",
    grade: "10Б",
    subjects: ["Английский язык", "Испанский язык"],
    experience: "1 год",
    rating: 4.6,
    availability: "Вт, Чт после 16:30",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    name: "Екатерина Иванова",
    grade: "11В",
    subjects: ["Английский язык", "Немецкий язык"],
    experience: "3 года",
    rating: 4.9,
    availability: "Пн-Пт после 17:00, Сб с 10:00",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 4,
    name: "Михаил Соколов",
    grade: "9А",
    subjects: ["Английский язык"],
    experience: "1.5 года",
    rating: 4.5,
    availability: "Вт, Чт, Сб после 14:30",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 5,
    name: "Дарья Козлова",
    grade: "10"А",
    subjects: ["Английский язык", "Французский язык"],
    experience: "2.5 года",
    rating: 4.7,
    availability: "Ср, Пт, Вс после 15:00",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  },
];

// Моковые данные для уроков
const lessonsData = [
  {
    id: 1,
    title: "Базовая грамматика",
    teacher: "Анна Смирнова",
    level: "Начинающий",
    date: "15 мая 2025",
    time: "15:30 - 16:30",
    spots: 3,
    totalSpots: 5,
  },
  {
    id: 2,
    title: "Разговорный английский",
    teacher: "Иван Петров",
    level: "Средний",
    date: "16 мая 2025",
    time: "16:00 - 17:00",
    spots: 2,
    totalSpots: 6,
  },
  {
    id: 3,
    title: "Подготовка к ЕГЭ",
    teacher: "Екатерина Иванова",
    level: "Продвинутый",
    date: "17 мая 2025",
    time: "17:00 - 18:30",
    spots: 4,
    totalSpots: 4,
  },
  {
    id: 4,
    title: "Английские времена",
    teacher: "Михаил Соколов",
    level: "Начинающий",
    date: "18 мая 2025",
    time: "14:30 - 15:30",
    spots: 1,
    totalSpots: 5,
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState(teachersData);
  const [activeTab, setActiveTab] = useState("teachers");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Функция поиска учителей
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    const filtered = teachersData.filter(teacher => 
      teacher.name.toLowerCase().includes(term.toLowerCase()) ||
      teacher.subjects.some(subject => subject.toLowerCase().includes(term.toLowerCase())) ||
      teacher.grade.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredTeachers(filtered);
  };

  // Обработчик отправки формы записи на урок
  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      // Reset form here
    }, 3000);
  };

  // Обработчик записи на групповой урок
  const handleGroupLessonSignup = (lessonId: number) => {
    // В реальном приложении здесь был бы API-запрос
    alert(`Вы успешно записаны на урок #${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-blue-600 text-white p-4 md:p-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Icon name="Book" className="mr-2 h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold">Учителя-волонтеры школы №224</h1>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link to="/materials">
                  <Icon name="FileText" className="mr-2 h-4 w-4" />
                  Учебные материалы
                </Link>
              </Button>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                <Icon name="LogIn" className="mr-2 h-4 w-4" />
                Войти
              </Button>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                Стать волонтером
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="container mx-auto px-4 py-8">
        {/* Табы для навигации */}
        <Tabs 
          defaultValue="teachers" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-8 max-w-4xl mx-auto"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="teachers">Найти волонтера</TabsTrigger>
            <TabsTrigger value="lessons">Групповые уроки</TabsTrigger>
            <TabsTrigger value="request">Запросить помощь</TabsTrigger>
          </TabsList>

          {/* Содержимое таба "Найти волонтера" */}
          <TabsContent value="teachers">
            {/* Поисковый раздел */}
            <section className="mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Найдите помощника по изучению английского языка</h2>
                <p className="text-gray-600 mb-6 text-center">Учащиеся школы №224 помогают друг другу преодолеть трудности в обучении</p>
                
                <div className="relative">
                  <Input
                    placeholder="Поиск по имени, классу или предмету..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                  <Icon name="Search" className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                </div>
              </div>
            </section>

            {/* Раздел с карточками учителей */}
            <section>
              <h2 className="text-xl font-semibold mb-6">Доступные волонтеры ({filteredTeachers.length})</h2>
              
              {filteredTeachers.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="SearchX" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Учителя не найдены</h3>
                  <p className="text-gray-500 mt-2">Попробуйте изменить параметры поиска</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeachers.map((teacher) => (
                    <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-0">
                        <div className="flex items-center gap-4">
                          <img 
                            src={teacher.image} 
                            alt={teacher.name} 
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                          />
                          <div>
                            <CardTitle className="text-lg">{teacher.name}</CardTitle>
                            <CardDescription>Класс: {teacher.grade}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Предметы:</div>
                            <div className="flex flex-wrap gap-2">
                              {teacher.subjects.map((subject, idx) => (
                                <Badge key={idx} variant="secondary">{subject}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Опыт:</div>
                            <div className="text-sm">{teacher.experience}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Доступность:</div>
                            <div className="text-sm">{teacher.availability}</div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-500 mr-2">Рейтинг:</div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-1">{teacher.rating}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Icon 
                                    key={i = i 
                                    name="Star" 
                                    className={`h-4 w-4 ${i < Math.floor(teacher.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill={i < Math.floor(teacher.rating) ? 'currentColor' : 'none'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" size="sm">
                          <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
                          Связаться
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </TabsContent>

          {/* Содержимое таба "Групповые уроки" */}
          <TabsContent value="lessons">
            <section className="mb-10">
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">Расписание групповых занятий</h2>
                <p className="text-gray-600 mb-6 text-center">
                  Изучайте английский язык в группе до 6 человек с нашими волонтерами
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lessonsData.map((lesson) => (
                    <Card key={lesson.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="bg-blue-50 pb-2">
                        <CardTitle className="text-lg flex justify-between items-center">
                          <span>{lesson.title}</span>
                          <Badge variant={lesson.spots > 0 ? "secondary" : "outline"}>
                            {lesson.spots > 0 ? `${lesson.spots} места` : "Нет мест"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>Преподаватель: {lesson.teacher}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Уровень:</span>
                            <span>{lesson.level}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Дата:</span>
                            <span>{lesson.date}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Время:</span>
                            <span>{lesson.time}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Наполненность:</span>
                            <span>{lesson.totalSpots - lesson.spots}/{lesson.totalSpots}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          size="sm"
                          disabled={lesson.spots === 0}
                          onClick={() => handleGroupLessonSignup(lesson.id)}
                        >
                          <Icon name="Calendar" className="mr-2 h-4 w-4" />
                          {lesson.spots > 0 ? "Записаться" : "Нет мест"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Содержимое таба "Запросить помощь" */}
          <TabsContent value="request">
            <section>
              <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-center">Запрос на индивидуальное обучение</h2>
                <p className="text-gray-600 mb-6 text-center">
                  Заполните форму, чтобы запросить индивидуальные занятия по английскому языку
                </p>
                
                {formSubmitted ? (
                  <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <Icon name="Check" className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-green-700 mb-2">Заявка отправлена!</h3>
                    <p className="text-gray-600">
                      Мы свяжемся с вами в ближайшее время для организации занятий.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLessonSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Ваше имя и фамилия</Label>
                      <Input id="student-name" placeholder="Иван Иванов" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="student-class">Ваш класс</Label>
                      <Input id="student-class" placeholder="например: 9Б" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="student-level">Уровень владения английским</Label>
                      <Select required>
                        <SelectTrigger id="student-level">
                          <SelectValue placeholder="Выберите уровень" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Начинающий</SelectItem>
                          <SelectItem value="elementary">Элементарный</SelectItem>
                          <SelectItem value="intermediate">Средний</SelectItem>
                          <SelectItem value="advanced">Продвинутый</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="teacher-preference">Предпочитаемый учитель (необязательно)</Label>
                      <Select onValueChange={setSelectedTeacher}>
                        <SelectTrigger id="teacher-preference">
                          <SelectValue placeholder="Выберите учителя" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Любой доступный учитель</SelectItem>
                          {teachersData.map(teacher => (
                            <SelectItem key={teacher.id} value={String(teacher.id)}>
                              {teacher.name} ({teacher.grade})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="schedule-preference">Предпочитаемые дни и время</Label>
                      <Input id="schedule-preference" placeholder="например: Вт, Чт после 15:00" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="learning-goals">Чему вы хотите научиться?</Label>
                      <Textarea 
                        id="learning-goals" 
                        placeholder="Опишите ваши цели обучения и сложности с английским языком"
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Icon name="Send" className="mr-2 h-4 w-4" />
                      Отправить заявку
                    </Button>
                  </form>
                )}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      {/* Футер */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">О проекте</h3>
              <p className="text-gray-600">
                Платформа учителей-волонтеров школы №224 помогает ученикам найти помощь в изучении английского языка среди своих же одноклассников.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <p className="text-gray-600">
                Адрес: г. Москва, ул. Школьная, д. 224<br />
                Email: volunteers@school224.ru<br />
                Телефон: +7 (495) 123-45-67
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Полезные ссылки</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-blue-600 hover:underline">Главная</Link></li>
                <li><Link to="/about" className="text-blue-600 hover:underline">О нас</Link></li>
                <li><Link to="/faq" className="text-blue-600 hover:underline">Часто задаваемые вопросы</Link></li>
                <li><Link to="/rules" className="text-blue-600 hover:underline">Правила платформы</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500">
            <p>© 2025 Школа №224. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;