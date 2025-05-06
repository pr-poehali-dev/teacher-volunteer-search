
import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Моковые данные для учебных материалов
const initialMaterials = [
  {
    id: 1,
    title: "Грамматика английского языка",
    type: "pdf",
    level: "Начинающий",
    author: "Анна Смирнова",
    description: "Основы грамматики английского языка для начинающих",
    uploadDate: "01.05.2025",
    size: "2.4 MB",
    downloads: 120,
    category: "grammar",
    tags: ["грамматика", "начинающий", "артикли", "времена"],
    url: "#"
  },
  {
    id: 2,
    title: "Разговорный английский",
    type: "pdf",
    level: "Средний",
    author: "Иван Петров",
    description: "Полезные фразы и выражения для повседневного общения",
    uploadDate: "10.04.2025",
    size: "1.8 MB",
    downloads: 85,
    category: "speaking",
    tags: ["разговорный", "фразы", "диалоги"],
    url: "#"
  },
  {
    id: 3,
    title: "Аудирование для ЕГЭ",
    type: "audio",
    level: "Продвинутый",
    author: "Екатерина Иванова",
    description: "Аудиоматериалы и упражнения для подготовки к ЕГЭ",
    uploadDate: "15.04.2025",
    size: "18 MB",
    downloads: 65,
    category: "listening",
    tags: ["аудирование", "ЕГЭ", "тесты"],
    url: "#"
  },
  {
    id: 4,
    title: "Интерактивные карточки: Irregular Verbs",
    type: "interactive",
    level: "Начинающий",
    author: "Михаил Соколов",
    description: "Интерактивные карточки для запоминания неправильных глаголов",
    uploadDate: "20.04.2025",
    size: "1.2 MB",
    downloads: 145,
    category: "vocabulary",
    tags: ["глаголы", "карточки", "интерактив"],
    url: "#"
  },
  {
    id: 5,
    title: "Презентация: Страны и культуры",
    type: "presentation",
    level: "Средний",
    author: "Дарья Козлова",
    description: "Презентация о англоязычных странах и их культурах",
    uploadDate: "05.05.2025",
    size: "5.6 MB",
    downloads: 78,
    category: "culture",
    tags: ["культура", "страны", "презентация"],
    url: "#"
  },
  {
    id: 6,
    title: "Тренажер по чтению",
    type: "interactive",
    level: "Продвинутый",
    author: "Екатерина Иванова",
    description: "Интерактивный тренажер для отработки навыков чтения",
    uploadDate: "25.04.2025",
    size: "2.8 MB",
    downloads: 56,
    category: "reading",
    tags: ["чтение", "тренажер", "продвинутый"],
    url: "#"
  }
];

const Materials = () => {
  const [materials, setMaterials] = useState(initialMaterials);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    level: "",
    category: "",
    tags: ""
  });

  // Функция для поиска материалов
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Фильтрация материалов по поиску и категории
  const filteredMaterials = materials.filter(material => {
    const matchSearch = 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchCategory = activeCategory === "all" || material.category === activeCategory;
    
    return matchSearch && matchCategory;
  });

  // Обработчик формы добавления нового материала
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = Math.max(...materials.map(m => m.id)) + 1;
    const tagsArray = newMaterial.tags.split(',').map(tag => tag.trim());
    
    const materialToAdd = {
      id: newId,
      title: newMaterial.title,
      type: "pdf",
      level: newMaterial.level,
      author: "Текущий пользователь",
      description: newMaterial.description,
      uploadDate: new Date().toLocaleDateString('ru-RU'),
      size: "1.0 MB",
      downloads: 0,
      category: newMaterial.category,
      tags: tagsArray,
      url: "#"
    };
    
    setMaterials([...materials, materialToAdd]);
    
    // Сброс формы
    setNewMaterial({
      title: "",
      description: "",
      level: "",
      category: "",
      tags: ""
    });
    
    setIsDialogOpen(false);
  };
  
  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMaterial({
      ...newMaterial,
      [name]: value
    });
  };
  
  // Обработчик изменения селектов
  const handleSelectChange = (name: string, value: string) => {
    setNewMaterial({
      ...newMaterial,
      [name]: value
    });
  };

  // Получение иконки в зависимости от типа файла
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "FileText";
      case "audio":
        return "Headphones";
      case "interactive":
        return "MousePointerClick";
      case "presentation":
        return "Presentation";
      default:
        return "File";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-blue-600 text-white p-4 md:p-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Icon name="Book" className="mr-2 h-8 w-8" />
              <h1 className="text-2xl md:text-3xl font-bold">Учебные материалы</h1>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link to="/">
                  <Icon name="Home" className="mr-2 h-4 w-4" />
                  На главную
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Верхний блок с поиском и добавлением материала */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold">Учебные материалы по английскому языку</h2>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" className="mr-2 h-4 w-4" />
                    Добавить материал
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Добавить новый учебный материал</DialogTitle>
                    <DialogDescription>
                      Заполните информацию о вашем учебном материале
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название материала</Label>
                      <Input 
                        id="title" 
                        name="title"
                        placeholder="Введите название" 
                        value={newMaterial.title}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        placeholder="Краткое описание материала" 
                        value={newMaterial.description}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="level">Уровень сложности</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("level", value)}
                          required
                        >
                          <SelectTrigger id="level">
                            <SelectValue placeholder="Выберите уровень" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Начинающий">Начинающий</SelectItem>
                            <SelectItem value="Средний">Средний</SelectItem>
                            <SelectItem value="Продвинутый">Продвинутый</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category">Категория</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("category", value)}
                          required
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grammar">Грамматика</SelectItem>
                            <SelectItem value="vocabulary">Словарный запас</SelectItem>
                            <SelectItem value="speaking">Разговорная речь</SelectItem>
                            <SelectItem value="listening">Аудирование</SelectItem>
                            <SelectItem value="reading">Чтение</SelectItem>
                            <SelectItem value="writing">Письмо</SelectItem>
                            <SelectItem value="culture">Культура</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tags">Теги (через запятую)</Label>
                      <Input 
                        id="tags" 
                        name="tags"
                        placeholder="грамматика, времена, начинающий" 
                        value={newMaterial.tags}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file">Файл материала</Label>
                      <Input 
                        id="file" 
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.mp3,.mp4"
                      />
                      <p className="text-xs text-gray-500">Поддерживаются форматы: PDF, DOC, PPTX, MP3, MP4</p>
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit">Опубликовать материал</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="relative mb-6">
              <Input
                placeholder="Поиск учебных материалов..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
              <Icon name="Search" className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
            </div>
            
            <Tabs 
              defaultValue="all" 
              value={activeCategory} 
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="grammar">Грамматика</TabsTrigger>
                <TabsTrigger value="vocabulary">Лексика</TabsTrigger>
                <TabsTrigger value="speaking">Речь</TabsTrigger>
                <TabsTrigger value="listening">Аудирование</TabsTrigger>
                <TabsTrigger value="reading">Чтение</TabsTrigger>
                <TabsTrigger value="writing">Письмо</TabsTrigger>
                <TabsTrigger value="culture">Культура</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Список материалов */}
          <div className="space-y-8">
            <h3 className="text-xl font-medium">Найдено материалов: {filteredMaterials.length}</h3>
            
            {filteredMaterials.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Icon name="SearchX" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-700 mb-2">Материалы не найдены</h4>
                <p className="text-gray-500">Попробуйте изменить параметры поиска или добавьте свой материал</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => (
                  <Card key={material.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Icon name={getFileIcon(material.type)} className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{material.title}</CardTitle>
                            <CardDescription>{material.author} • {material.uploadDate}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{material.level}</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <p className="text-gray-600 mb-3">{material.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {material.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Размер: {material.size}</span>
                        <span>Скачиваний: {material.downloads}</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button className="w-full" size="sm" asChild>
                        <a href={material.url} download>
                          <Icon name="Download" className="mr-2 h-4 w-4" />
                          Скачать материал
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Футер */}
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <nav className="flex space-x-6">
              <Link to="/" className="text-blue-600 hover:underline">Главная</Link>
              <Link to="/materials" className="text-blue-600 hover:underline">Учебные материалы</Link>
              <Link to="/about" className="text-blue-600 hover:underline">О нас</Link>
              <Link to="/contacts" className="text-blue-600 hover:underline">Контакты</Link>
            </nav>
          </div>
          <div className="mt-6 text-center text-gray-500">
            <p>© 2025 Школа №224. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Materials;
